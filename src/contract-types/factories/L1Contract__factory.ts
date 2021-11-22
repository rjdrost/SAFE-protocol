/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { L1Contract, L1ContractInterface } from "../L1Contract";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "senderNonce",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct WithdrawalTicket",
        name: "ticket",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "escrowPreimage",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "claimTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "senderNonce",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct WithdrawalTicket[]",
        name: "tickets",
        type: "tuple[]",
      },
      {
        internalType: "bytes32[]",
        name: "escrowPreimages",
        type: "bytes32[]",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct Signature[]",
        name: "signatures",
        type: "tuple[]",
      },
    ],
    name: "claimTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610834806100206000396000f3fe6080604052600436106100345760003560e01c8063050befea14610039578063783f9d151461005b578063d0e30db01461007b575b600080fd5b34801561004557600080fd5b5061005961005436600461052b565b610083565b005b34801561006757600080fd5b5061005961007636600461060b565b61048e565b610059610505565b60008360405160200161009691906106eb565b6040516020818303038152906040528051906020012090506000816040516020016100ed91907f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b604051602081830303815290604052805190602001209050600060018285604001602081019061011d9190610741565b604080516000815260208181018084529490945260ff909216908201528635606082015290860135608082015260a0016020604051602081039080840390855afa15801561016f573d6000803e3d6000fd5b505060408051601f198101516020820189905293506000925001604051602081830303815290604052805190602001209050866080013581146102175760405162461bcd60e51b815260206004820152603560248201527f54686520707265696d616765206d757374206d617463682074686520657363726044820152741bddc81a185cda081bdb881d1a19481d1a58dad95d605a1b60648201526084015b60405180910390fd5b60008061022a60808a0160608b0161076b565b6001600160a01b03166001600160a01b03168152602001908152602001600020548760200135146102b35760405162461bcd60e51b815260206004820152602d60248201527f5469636b6574206e6f6e6365206d75737420626520746865206e65787420617660448201526c61696c61626c65206e6f6e636560981b606482015260840161020e565b6102c3608088016060890161076b565b6001600160a01b0316826001600160a01b0316146103235760405162461bcd60e51b815260206004820152601e60248201527f5469636b6574206973206e6f74207369676e65642062792073656e6465720000604482015260640161020e565b86356001600061033960808b0160608c0161076b565b6001600160a01b03166001600160a01b031681526020019081526020016000205410156103b25760405162461bcd60e51b815260206004820152602160248201527f53656e64657220646f6573206e6f74206861766520656e6f7567682066756e646044820152607360f81b606482015260840161020e565b6000806103c560808a0160608b0161076b565b6001600160a01b03168152602081019190915260400160009081208054916103ec8361079e565b909155506104029050606088016040890161076b565b6040516001600160a01b039190911690883580156108fc02916000818181858888f1935050505015801561043a573d6000803e3d6000fd5b5086356001600061045160808b0160608c0161076b565b6001600160a01b03166001600160a01b03168152602001908152602001600020600082825461048091906107b9565b909155505050505050505050565b60005b858110156104fc576104ea8787838181106104ae576104ae6107d0565b905060a002018686848181106104c6576104c66107d0565b905060200201358585858181106104df576104df6107d0565b905060600201610083565b806104f48161079e565b915050610491565b50505050505050565b33600090815260016020526040812080543492906105249084906107e6565b9091555050565b600080600083850361012081121561054257600080fd5b60a081121561055057600080fd5b84935060a08401359250606060bf198201121561056c57600080fd5b5060c0840190509250925092565b60008083601f84011261058c57600080fd5b50813567ffffffffffffffff8111156105a457600080fd5b6020830191508360208260051b85010111156105bf57600080fd5b9250929050565b60008083601f8401126105d857600080fd5b50813567ffffffffffffffff8111156105f057600080fd5b6020830191508360206060830285010111156105bf57600080fd5b6000806000806000806060878903121561062457600080fd5b863567ffffffffffffffff8082111561063c57600080fd5b818901915089601f83011261065057600080fd5b81358181111561065f57600080fd5b8a602060a08302850101111561067457600080fd5b60209283019850965090880135908082111561068f57600080fd5b61069b8a838b0161057a565b909650945060408901359150808211156106b457600080fd5b506106c189828a016105c6565b979a9699509497509295939492505050565b6001600160a01b03811681146106e857600080fd5b50565b813581526020808301359082015260a08101604083013561070b816106d3565b6001600160a01b03908116604084015260608401359061072a826106d3565b166060830152608092830135929091019190915290565b60006020828403121561075357600080fd5b813560ff8116811461076457600080fd5b9392505050565b60006020828403121561077d57600080fd5b8135610764816106d3565b634e487b7160e01b600052601160045260246000fd5b60006000198214156107b2576107b2610788565b5060010190565b6000828210156107cb576107cb610788565b500390565b634e487b7160e01b600052603260045260246000fd5b600082198211156107f9576107f9610788565b50019056fea2646970667358221220a0bf2950ae9ac35fd62dbc84d3ea385927fd59888ba4c48665e7608436bc786664736f6c634300080a0033";

type L1ContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L1ContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class L1Contract__factory extends ContractFactory {
  constructor(...args: L1ContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<L1Contract> {
    return super.deploy(overrides || {}) as Promise<L1Contract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): L1Contract {
    return super.attach(address) as L1Contract;
  }
  connect(signer: Signer): L1Contract__factory {
    return super.connect(signer) as L1Contract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L1ContractInterface {
    return new utils.Interface(_abi) as L1ContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L1Contract {
    return new Contract(address, _abi, signerOrProvider) as L1Contract;
  }
}
