import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import { ethers as ethersTypes } from "ethers";
import { ethers } from "hardhat";

import { L1__factory } from "../contract-types/factories/L1__factory";
import { L2__factory } from "../contract-types/factories/L2__factory";
import { L1, L1TicketStruct } from "../contract-types/L1";
import { L2, L2DepositStruct, TicketStruct } from "../contract-types/L2";

import { TestToken__factory } from "../contract-types/factories/TestToken__factory";
import { TestToken } from "../contract-types/TestToken";

import { MAX_AUTH_DELAY, SAFETY_DELAY } from "../src/constants";
import { TicketsWithNonce } from "../src/types";
import { hashTickets, signData } from "../src/utils";
import { customer2Address, customerPK, lpPK, waitForTx } from "./utils";

const gasLimit = 30_000_000;
const tokenBalance = 1_000_000;

const customerWallet = new ethers.Wallet(customerPK, ethers.provider);
const lpWallet = new ethers.Wallet(lpPK, ethers.provider);

const l1Deployer = new L1__factory(lpWallet);
const l2Deployer = new L2__factory(lpWallet);
const tokenDeployer = new TestToken__factory(lpWallet);

let lpL1: L1;
let customerL2: L2, lpL2: L2;
let testToken: TestToken;

async function deposit(trustedNonce: number, trustedAmount: number) {
  const depositAmount = 1;
  const deposit: L2DepositStruct = {
    trustedNonce,
    trustedAmount,
    depositAmount,
    l1Recipient: customerWallet.address,
    token: testToken.address,
  };
  const deposit2: L2DepositStruct = {
    ...deposit,
    l1Recipient: customer2Address,
  };

  await waitForTx(customerL2.depositOnL2(deposit, { value: depositAmount }));
  await waitForTx(customerL2.depositOnL2(deposit2, { value: depositAmount }));
}

async function depositOnce(trustedNonce: number, trustedAmount: number) {
  const depositAmount = 1;
  const deposit: L2DepositStruct = {
    trustedNonce,
    trustedAmount,
    depositAmount,
    l1Recipient: customerWallet.address,
    token: testToken.address,
  };

  await waitForTx(customerL2.depositOnL2(deposit, { value: depositAmount }));
}
async function authorizeWithdrawal(
  trustedNonce: number,
  numTickets = 2
): Promise<{ tickets: L1TicketStruct[]; signature: ethersTypes.Signature }> {
  const tickets: L1TicketStruct[] = [];
  for (let i = 0; i < numTickets; i++) {
    tickets.push(ticketToL1Ticket(await lpL2.tickets(trustedNonce + i)));
  }

  const ticketsWithNonce: TicketsWithNonce = {
    startNonce: trustedNonce,
    tickets,
  };
  const signature = signData(hashTickets(ticketsWithNonce), lpPK);
  await waitForTx(
    lpL2.authorizeWithdrawal(
      trustedNonce,
      trustedNonce + numTickets - 1,
      signature,
      {
        // TODO: remove this after addressing https://github.com/statechannels/SAFE-protocol/issues/70
        gasLimit,
      }
    )
  );
  return { tickets, signature };
}

/**
 *
 * @param trustedNonce The sum of all tickets starting with trustedNonce + new deposit must be <= trustedAmount
 * @param trustedAmount amount expected to be held on L1 contract
 * @param numTickets number of tickets to include in the swap's batch
 * @returns receipt of the L1 claimBatch transaction
 */
async function swap(
  trustedNonce: number,
  trustedAmount: number,
  numTickets = 2
) {
  for (let i = 0; i < numTickets; i++) {
    await depositOnce(trustedNonce, trustedAmount);
  }
  const { tickets, signature } = await authorizeWithdrawal(
    trustedNonce,
    numTickets
  );

  const l1TransactionReceipt = await waitForTx(
    lpL1.claimBatch(tickets, signature, { gasLimit })
  );

  await ethers.provider.send("evm_increaseTime", [SAFETY_DELAY + 1]);
  await waitForTx(lpL2.claimL2Funds(trustedNonce));

  // TODO: This ought to estimate the total user cost. The cost of the L1 transaction
  // is currently used as a rough estimate of the total user cost.
  return l1TransactionReceipt;
}

beforeEach(async () => {
  const l1 = await l1Deployer.deploy();
  const l2 = await l2Deployer.deploy();

  customerL2 = l2.connect(customerWallet);

  lpL2 = l2.connect(lpWallet);
  lpL1 = l1.connect(lpWallet);

  testToken = await tokenDeployer.deploy(tokenBalance);
  // Transfer 1/4 to the customer account
  await testToken.transfer(customerWallet.address, tokenBalance / 4);
  // Transfer 1/4 to the l1 contract for payouts
  await testToken.transfer(l1.address, tokenBalance / 4);
  // Transfer 1/4 to the l2 contract for payouts
  await testToken.transfer(l2.address, tokenBalance / 4);
  // Approve transfers for the L1 and L2 contract for the LP
  await testToken.approve(l2.address, tokenBalance);
  await testToken.approve(l1.address, tokenBalance);
  // Approve transfers for the L1 and L2 contract for the customer
  await testToken.connect(customerWallet).approve(l1.address, tokenBalance);
  await testToken.connect(customerWallet).approve(l2.address, tokenBalance);
});

it("One successfull e2e swaps", async () => {
  await swap(0, 10);
});

it("Two successfull e2e swaps", async () => {
  await swap(0, 10);
  await swap(2, 8);
});

it("Unable to authorize overlapping batches", async () => {
  await swap(0, 10);
  await expect(swap(1, 9)).to.be.rejectedWith("Batches must be gapless");
});

function ticketToL1Ticket(ticket: TicketStruct): L1TicketStruct {
  return {
    value: ticket.value,
    l1Recipient: ticket.l1Recipient,
    token: ticket.token,
  };
}

it("Handles a fraud proofs", async () => {
  /**
   * Fraud instance 1. The liquidity provider signs a batch of tickets with the
   * second ticket's l1Recipient switched to LP's address
   */
  await deposit(0, 10);

  // Sign fraudulent batch
  const ticket = await lpL2.tickets(0);
  const ticket2 = await lpL2.tickets(1);
  await authorizeWithdrawal(0);

  const fraudTicket = { ...ticket2, l1Recipient: lpWallet.address };
  const ticketsWithNonce: TicketsWithNonce = {
    startNonce: 0,
    tickets: [ticket, fraudTicket].map(ticketToL1Ticket),
  };
  const fraudSignature = signData(hashTickets(ticketsWithNonce), lpPK);

  // Successfully prove fraud
  await waitForTx(
    customerL2.refundOnFraud(
      0,
      1,
      0,
      1,
      [ticket, fraudTicket].map(ticketToL1Ticket),
      fraudSignature,
      { gasLimit }
    )
  );

  // Unsuccessfully try to claim fraud again
  await expect(
    customerL2.refundOnFraud(
      0,
      1,
      0,
      1,
      [ticket, fraudTicket].map(ticketToL1Ticket),
      fraudSignature,
      {
        gasLimit,
      }
    )
  ).to.be.rejectedWith("Batch status must be Authorized");

  /**
   * Fraud instance 2. The setup is:
   * - There are 4 tickets. The first two tickets have been refunded above.
   * - The second two tickets are authorized by LP.
   * - LP signs a batch that includes a correct 2nd ticket and a fraudulent 3rd ticket.
   */
  await deposit(2, 8);
  await authorizeWithdrawal(2);

  // Sign fraudulent batch again
  const ticket3 = await lpL2.tickets(1);
  const ticket4 = await lpL2.tickets(2);
  const fraudTicket2 = { ...ticket4, l1Recipient: lpWallet.address };
  const ticketsWithNonce2: TicketsWithNonce = {
    startNonce: 1,
    tickets: [ticket3, fraudTicket2].map(ticketToL1Ticket),
  };
  const fraudSignature2 = signData(hashTickets(ticketsWithNonce2), lpPK);

  await waitForTx(
    customerL2.refundOnFraud(
      2,
      0,
      1,
      1,
      [ticket3, fraudTicket2].map(ticketToL1Ticket),
      fraudSignature2,
      { gasLimit }
    )
  );
});

it("Able to get a ticket refunded", async () => {
  await deposit(0, 10);
  await expect(customerL2.refund(0, { gasLimit })).to.be.rejectedWith(
    "maxAuthDelay must have passed since deposit"
  );

  const delta = 5;
  await ethers.provider.send("evm_increaseTime", [MAX_AUTH_DELAY - delta]);
  await expect(customerL2.refund(1, { gasLimit })).to.be.rejectedWith(
    "maxAuthDelay must have passed since deposit"
  );
  await ethers.provider.send("evm_increaseTime", [2 * delta]);

  await waitForTx(customerL2.refund(0, { gasLimit }));
  await waitForTx(customerL2.refund(1, { gasLimit }));
  await expect(customerL2.refund(1, { gasLimit })).to.be.rejectedWith(
    "The nonce must not be a part of a batch"
  );

  await deposit(2, 8);
  await ethers.provider.send("evm_increaseTime", [MAX_AUTH_DELAY + delta]);
  // Refund 3rd and 4th deposit
  await waitForTx(customerL2.refund(2, { gasLimit }));
});
