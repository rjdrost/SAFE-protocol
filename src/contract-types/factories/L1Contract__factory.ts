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
            name: "nonce",
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
            name: "nonce",
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
  "0x608060405234801561001057600080fd5b50610813806100206000396000f3fe6080604052600436106100345760003560e01c8063050befea14610039578063783f9d151461005b578063d0e30db01461007b575b600080fd5b34801561004557600080fd5b5061005961005436600461050a565b610083565b005b34801561006757600080fd5b506100596100763660046105ea565b61046d565b6100596104e4565b60008360405160200161009691906106ca565b6040516020818303038152906040528051906020012090506000816040516020016100ed91907f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b604051602081830303815290604052805190602001209050600060018285604001602081019061011d9190610720565b604080516000815260208181018084529490945260ff909216908201528635606082015290860135608082015260a0016020604051602081039080840390855afa15801561016f573d6000803e3d6000fd5b505060408051601f198101516020820189905293506000925001604051602081830303815290604052805190602001209050866080013581146102175760405162461bcd60e51b815260206004820152603560248201527f54686520707265696d616765206d757374206d617463682074686520657363726044820152741bddc81a185cda081bdb881d1a19481d1a58dad95d605a1b60648201526084015b60405180910390fd5b60008061022a60808a0160608b0161074a565b6001600160a01b0316815260208101919091526040016000205461024f90600161077d565b8760200135146102b75760405162461bcd60e51b815260206004820152602d60248201527f5469636b6574206e6f6e6365206d75737420626520746865206e65787420617660448201526c61696c61626c65206e6f6e636560981b606482015260840161020e565b6102c7608088016060890161074a565b6001600160a01b0316826001600160a01b0316146103275760405162461bcd60e51b815260206004820152601e60248201527f5469636b6574206973206e6f74207369676e65642062792073656e6465720000604482015260640161020e565b86356001600061033d60808b0160608c0161074a565b6001600160a01b03166001600160a01b031681526020019081526020016000205410156103b65760405162461bcd60e51b815260206004820152602160248201527f53656e64657220646f6573206e6f74206861766520656e6f7567682066756e646044820152607360f81b606482015260840161020e565b6000806103c960808a0160608b0161074a565b6001600160a01b03168152602081019190915260400160009081208054916103f083610795565b909155506104069050606088016040890161074a565b6040516001600160a01b039190911690883580156108fc02916000818181858888f1935050505015801561043e573d6000803e3d6000fd5b5033600090815260016020526040812080548935929061045f9084906107b0565b909155505050505050505050565b60005b858110156104db576104c987878381811061048d5761048d6107c7565b905060a002018686848181106104a5576104a56107c7565b905060200201358585858181106104be576104be6107c7565b905060600201610083565b806104d381610795565b915050610470565b50505050505050565b336000908152600160205260408120805434929061050390849061077d565b9091555050565b600080600083850361012081121561052157600080fd5b60a081121561052f57600080fd5b84935060a08401359250606060bf198201121561054b57600080fd5b5060c0840190509250925092565b60008083601f84011261056b57600080fd5b50813567ffffffffffffffff81111561058357600080fd5b6020830191508360208260051b850101111561059e57600080fd5b9250929050565b60008083601f8401126105b757600080fd5b50813567ffffffffffffffff8111156105cf57600080fd5b60208301915083602060608302850101111561059e57600080fd5b6000806000806000806060878903121561060357600080fd5b863567ffffffffffffffff8082111561061b57600080fd5b818901915089601f83011261062f57600080fd5b81358181111561063e57600080fd5b8a602060a08302850101111561065357600080fd5b60209283019850965090880135908082111561066e57600080fd5b61067a8a838b01610559565b9096509450604089013591508082111561069357600080fd5b506106a089828a016105a5565b979a9699509497509295939492505050565b6001600160a01b03811681146106c757600080fd5b50565b813581526020808301359082015260a0810160408301356106ea816106b2565b6001600160a01b039081166040840152606084013590610709826106b2565b166060830152608092830135929091019190915290565b60006020828403121561073257600080fd5b813560ff8116811461074357600080fd5b9392505050565b60006020828403121561075c57600080fd5b8135610743816106b2565b634e487b7160e01b600052601160045260246000fd5b6000821982111561079057610790610767565b500190565b60006000198214156107a9576107a9610767565b5060010190565b6000828210156107c2576107c2610767565b500390565b634e487b7160e01b600052603260045260246000fdfea26469706673582212208df3289403252b85266c3d37ca44df1d6693dad139824015cef9be8a682044e064736f6c634300080a0033";

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