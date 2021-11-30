/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type EscrowEntryStruct = {
  receiver: string;
  sender: string;
  value: BigNumberish;
  claimStart: BigNumberish;
  claimExpiry: BigNumberish;
  escrowHash: BytesLike;
};

export type EscrowEntryStructOutput = [
  string,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  string
] & {
  receiver: string;
  sender: string;
  value: BigNumber;
  claimStart: BigNumber;
  claimExpiry: BigNumber;
  escrowHash: string;
};

export type WithdrawalTicketStruct = {
  value: BigNumberish;
  senderNonce: BigNumberish;
  receiver: string;
  sender: string;
  escrowHash: BytesLike;
  expiry: BigNumberish;
};

export type WithdrawalTicketStructOutput = [
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  BigNumber
] & {
  value: BigNumber;
  senderNonce: BigNumber;
  receiver: string;
  sender: string;
  escrowHash: string;
  expiry: BigNumber;
};

export type SignatureStruct = { r: BytesLike; s: BytesLike; v: BigNumberish };

export type SignatureStructOutput = [string, string, number] & {
  r: string;
  s: string;
  v: number;
};

export interface L2ContractInterface extends utils.Interface {
  functions: {
    "claimFunds(bytes32,(address,address,uint256,uint256,uint256,bytes32))": FunctionFragment;
    "commitToWithdrawal((uint256,uint256,address,address,bytes32,uint256),(bytes32,bytes32,uint8))": FunctionFragment;
    "lockFundsInEscrow((address,address,uint256,uint256,uint256,bytes32))": FunctionFragment;
    "proveFraud((uint256,uint256,address,address,bytes32,uint256),(bytes32,bytes32,uint8),(uint256,uint256,address,address,bytes32,uint256),(bytes32,bytes32,uint8),(address,address,uint256,uint256,uint256,bytes32),bytes32)": FunctionFragment;
    "recoverSigner(bytes32,(bytes32,bytes32,uint8))": FunctionFragment;
    "refund((address,address,uint256,uint256,uint256,bytes32))": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "claimFunds",
    values: [BytesLike, EscrowEntryStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "commitToWithdrawal",
    values: [WithdrawalTicketStruct, SignatureStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "lockFundsInEscrow",
    values: [EscrowEntryStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "proveFraud",
    values: [
      WithdrawalTicketStruct,
      SignatureStruct,
      WithdrawalTicketStruct,
      SignatureStruct,
      EscrowEntryStruct,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverSigner",
    values: [BytesLike, SignatureStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "refund",
    values: [EscrowEntryStruct]
  ): string;

  decodeFunctionResult(functionFragment: "claimFunds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "commitToWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockFundsInEscrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proveFraud", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;

  events: {};
}

export interface L2Contract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: L2ContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claimFunds(
      escrowSecret: BytesLike,
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commitToWithdrawal(
      ticket: WithdrawalTicketStruct,
      ticketSignature: SignatureStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lockFundsInEscrow(
      entry: EscrowEntryStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    proveFraud(
      commitedTicket: WithdrawalTicketStruct,
      firstSignature: SignatureStruct,
      secondTicket: WithdrawalTicketStruct,
      secondSignature: SignatureStruct,
      entry: EscrowEntryStruct,
      escrowSecret: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recoverSigner(
      hash: BytesLike,
      signature: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<[string]>;

    refund(
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claimFunds(
    escrowSecret: BytesLike,
    entry: EscrowEntryStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commitToWithdrawal(
    ticket: WithdrawalTicketStruct,
    ticketSignature: SignatureStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lockFundsInEscrow(
    entry: EscrowEntryStruct,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  proveFraud(
    commitedTicket: WithdrawalTicketStruct,
    firstSignature: SignatureStruct,
    secondTicket: WithdrawalTicketStruct,
    secondSignature: SignatureStruct,
    entry: EscrowEntryStruct,
    escrowSecret: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recoverSigner(
    hash: BytesLike,
    signature: SignatureStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  refund(
    entry: EscrowEntryStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimFunds(
      escrowSecret: BytesLike,
      entry: EscrowEntryStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    commitToWithdrawal(
      ticket: WithdrawalTicketStruct,
      ticketSignature: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    lockFundsInEscrow(
      entry: EscrowEntryStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    proveFraud(
      commitedTicket: WithdrawalTicketStruct,
      firstSignature: SignatureStruct,
      secondTicket: WithdrawalTicketStruct,
      secondSignature: SignatureStruct,
      entry: EscrowEntryStruct,
      escrowSecret: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverSigner(
      hash: BytesLike,
      signature: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    refund(entry: EscrowEntryStruct, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    claimFunds(
      escrowSecret: BytesLike,
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commitToWithdrawal(
      ticket: WithdrawalTicketStruct,
      ticketSignature: SignatureStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lockFundsInEscrow(
      entry: EscrowEntryStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    proveFraud(
      commitedTicket: WithdrawalTicketStruct,
      firstSignature: SignatureStruct,
      secondTicket: WithdrawalTicketStruct,
      secondSignature: SignatureStruct,
      entry: EscrowEntryStruct,
      escrowSecret: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recoverSigner(
      hash: BytesLike,
      signature: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    refund(
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimFunds(
      escrowSecret: BytesLike,
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commitToWithdrawal(
      ticket: WithdrawalTicketStruct,
      ticketSignature: SignatureStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lockFundsInEscrow(
      entry: EscrowEntryStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    proveFraud(
      commitedTicket: WithdrawalTicketStruct,
      firstSignature: SignatureStruct,
      secondTicket: WithdrawalTicketStruct,
      secondSignature: SignatureStruct,
      entry: EscrowEntryStruct,
      escrowSecret: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recoverSigner(
      hash: BytesLike,
      signature: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    refund(
      entry: EscrowEntryStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
