import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import { BigNumber, Wallet } from "ethers";
import { ethers } from "hardhat";

import { TestToken__factory } from "../contract-types/factories/TestToken__factory";
import {
  approveAndSend,
  authorizeWithdrawal,
  customerPK,
  deposit,
  ExitChainTestSetup,
  getOptimismL1Fee,
  lpPK,
  ScenarioGasUsage,
  waitForTx,
} from "./utils";
import { ExitChainEscrow__factory } from "../contract-types/factories/ExitChainEscrow__factory";
import { SAFETY_DELAY } from "../src/constants";
import Table from "cli-table";
import { TokenPairStruct } from "../contract-types/ExitChainEscrow";
import { TestToken } from "../contract-types/TestToken";

type ExitChainScenarioGasUsage = ScenarioGasUsage & {
  type: "depositOnExitChain" | "authorizeWithdrawal" | "claimExitChainFunds";
};

const gasLimit = 30_000_000;
const tokenBalance = 1_000_000;

const customerWallet = new ethers.Wallet(customerPK, ethers.provider);
const lpWallet = new ethers.Wallet(lpPK, ethers.provider);

const exitChainDeployer = new ExitChainEscrow__factory(lpWallet);
const tokenDeployer = new TestToken__factory(lpWallet);
let testSetup: ExitChainTestSetup;

async function createCustomer(): Promise<Wallet> {
  const wallet = Wallet.createRandom({}).connect(ethers.provider);

  const fundTx = { to: wallet.address, value: ethers.utils.parseEther("1") };
  await waitForTx(lpWallet.sendTransaction(fundTx));

  for (const token of tokens) {
    await approveAndSend(
      token.contract,
      testSetup.lpExitChain.address,
      wallet,

      100
    );
  }

  return wallet;
}
export function printExitScenarioGasUsage(
  scenarios: ExitChainScenarioGasUsage[]
) {
  console.log("Exit chain Gas Usage");
  const table = new Table({
    head: [
      "Ticket Batch Size",
      "Exit Contract Function",
      "Total Gas",
      "Average Gas Per Call",
      "Total Optimism L1 Fee",
      "Average Optimism L1 Fee Per Call",
    ],
    colAligns: ["right", "right", "right"],
  });

  for (const scenario of scenarios) {
    const gasPerCall =
      scenario.type === "depositOnExitChain"
        ? scenario.totalGasUsed.div(scenario.batchSize)
        : scenario.totalGasUsed;
    const optimismCostPerCall =
      scenario.type === "depositOnExitChain"
        ? scenario.optimismCost.div(scenario.batchSize)
        : scenario.optimismCost;
    table.push([
      scenario.batchSize,
      scenario.type,
      scenario.totalGasUsed.toNumber(),
      gasPerCall.toNumber(),
      scenario.optimismCost.toNumber(),
      optimismCostPerCall.toNumber(),
    ]);
  }
  console.log(table.toString());
}

async function runScenario(
  nonce: number,
  batchSize: number,
  customerMode: "Unique" | "Same"
): Promise<ExitChainScenarioGasUsage[]> {
  const results: ExitChainScenarioGasUsage[] = [];

  const trustedAmount = 10000;

  let totalDepositGas = BigNumber.from(0);
  let totalDepositOptimismFee = BigNumber.from(0);
  const sameCustomer = await createCustomer();
  const customers = [];

  for (let i = 0; i < batchSize; i++) {
    if (customerMode === "Unique") {
      customers.push(await createCustomer());
    } else {
      customers.push(sameCustomer);
    }
  }

  for (let i = 0; i < batchSize; i++) {
    const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
    const { gasUsed, optimismL1Fee } = await deposit(
      {
        ...testSetup,
        exitChainToken: randomToken.contract,
        customerExitChain: testSetup.lpExitChain.connect(customers[i]),
      },
      nonce + i,
      trustedAmount
    );

    totalDepositGas = totalDepositGas.add(gasUsed);
    totalDepositOptimismFee = totalDepositOptimismFee.add(optimismL1Fee);
  }

  results.push({
    type: "depositOnExitChain",
    batchSize,
    totalGasUsed: totalDepositGas,
    optimismCost: totalDepositOptimismFee,
  });

  const { lpExitChain } = testSetup;
  const authorizeResults = await authorizeWithdrawal(
    testSetup,
    nonce,
    batchSize
  );

  results.push({
    type: "authorizeWithdrawal",
    batchSize,
    totalGasUsed: authorizeResults.gasUsed,
    optimismCost: authorizeResults.optimismL1Fee,
  });
  await ethers.provider.send("evm_increaseTime", [SAFETY_DELAY + 1]);

  const claimResult = await lpExitChain.claimExitChainFunds(nonce);
  const claimReceipt = await waitForTx(claimResult);
  results.push({
    type: "claimExitChainFunds",
    batchSize,
    totalGasUsed: claimReceipt.gasUsed,
    optimismCost: getOptimismL1Fee(claimResult),
  });
  return results;
}

const tokens: Array<{ pair: TokenPairStruct; contract: TestToken }> = [];
beforeEach(async () => {
  for (let i = 0; i < 5; i++) {
    const contract = await tokenDeployer.deploy(tokenBalance);
    const randomAddress = Wallet.createRandom().address;
    const pair = {
      exitChainToken: contract.address,
      entryChainToken: randomAddress,
    };
    tokens.push({ pair, contract });
  }

  const exitChain = await exitChainDeployer.deploy();

  await exitChain.registerTokenPairs(tokens.map((t) => t.pair));
  const customerExitChain = exitChain.connect(customerWallet);

  const lpExitChain = exitChain.connect(lpWallet);

  testSetup = {
    lpExitChain,
    lpWallet,
    gasLimit,
    customerExitChain,
    exitChainToken: tokens[0].contract,
    customerWallet,
    tokenBalance,
  };
});

const benchmarkResults: ExitChainScenarioGasUsage[] = [];
it("exit gas benchmarking", async () => {
  let nonce = 0;
  // Perform an initial scenario run to
  await runScenario(nonce, 1, "Same");
  nonce++;

  const benchmarkScenarios = [1, 5, 20];

  for (const batchSize of benchmarkScenarios) {
    benchmarkResults.push(...(await runScenario(nonce, batchSize, "Same")));
    nonce += batchSize;
  }
}).timeout(120_000);

after(() => printExitScenarioGasUsage(benchmarkResults));
