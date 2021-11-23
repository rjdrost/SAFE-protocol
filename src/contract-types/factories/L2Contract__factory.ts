/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { L2Contract, L2ContractInterface } from "../L2Contract";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "escrowSecret",
        type: "bytes32[]",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimExpiry",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct EscrowEntry",
        name: "entry",
        type: "tuple",
      },
    ],
    name: "claimFunds",
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
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
        ],
        internalType: "struct WithdrawalTicket",
        name: "ticket",
        type: "tuple",
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
        name: "ticketSignature",
        type: "tuple",
      },
    ],
    name: "commitToWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimExpiry",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct EscrowEntry",
        name: "entry",
        type: "tuple",
      },
    ],
    name: "lockFundsInEscrow",
    outputs: [],
    stateMutability: "payable",
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
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
        ],
        internalType: "struct WithdrawalTicket",
        name: "commitedTicket",
        type: "tuple",
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
        name: "firstSignature",
        type: "tuple",
      },
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
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
        ],
        internalType: "struct WithdrawalTicket",
        name: "secondTicket",
        type: "tuple",
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
        name: "secondSignature",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimExpiry",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct EscrowEntry",
        name: "entry",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "escrowSecret",
        type: "bytes32",
      },
    ],
    name: "proveFraud",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
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
    name: "recoverSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimExpiry",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "escrowHash",
            type: "bytes32",
          },
        ],
        internalType: "struct EscrowEntry",
        name: "entry",
        type: "tuple",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610fe4806100206000396000f3fe6080604052600436106100555760003560e01c80631702b18b1461005a578063614ed87c1461007c5780636756c3f41461009c5780637d4d5a74146100bc5780639c6a84cd146100cf578063fd4a95051461010b575b600080fd5b34801561006657600080fd5b5061007a610075366004610c6b565b61012b565b005b34801561008857600080fd5b5061007a610097366004610ce2565b610536565b3480156100a857600080fd5b5061007a6100b7366004610d05565b6106d8565b61007a6100ca366004610ce2565b6107f1565b3480156100db57600080fd5b506100ef6100ea366004610db5565b610907565b6040516001600160a01b03909116815260200160405180910390f35b34801561011757600080fd5b5061007a610126366004610dd9565b6109c4565b60008660405160200161013e9190610e76565b604051602081830303815290604052805190602001209050600061016d82888036038101906100ea9190610ed6565b90506000866040516020016101829190610e76565b60405160208183030381529060405280519060200120905060006101b182888036038101906100ea9190610ed6565b9050818414156102085760405162461bcd60e51b815260206004820152601860248201527f5469636b657473206d7573742062652064697374696e6374000000000000000060448201526064015b60405180910390fd5b806001600160a01b0316836001600160a01b0316146102845760405162461bcd60e51b815260206004820152603260248201527f5468652074776f207469636b657473206d757374206265207369676e656420626044820152713c903a34329039b0b6b29039b4b3b732b91760711b60648201526084016101ff565b836001600061029960808e0160608f01610ef2565b6001600160a01b03166001600160a01b0316815260200190815260200160002060008c602001358152602001908152602001600020541461031c5760405162461bcd60e51b815260206004820152601e60248201527f546865207469636b6574206d75737420626520636f6d6d6974656420746f000060448201526064016101ff565b87602001358a60200135146103855760405162461bcd60e51b815260206004820152602960248201527f5468652074776f207469636b657473206d75737420686176652074686520736160448201526836b2903737b731b29760b91b60648201526084016101ff565b60008560405160200161039a91815260200190565b6040516020818303038152906040528051906020012090506000876040516020016103c59190610f0f565b6040516020818303038152906040528051906020012090506000808d60600160208101906103f39190610ef2565b6001600160a01b03166001600160a01b03168152602001908152602001600020600083815260200190815260200160002054811461048a5760405162461bcd60e51b815260206004820152602e60248201527f54686520657363726f7720656e74727920646f6573206e6f74206d617463682060448201526d0e8d0ca40cadce8e4f240d0c2e6d60931b60648201526084016101ff565b8b60a001354211156104de5760405162461bcd60e51b815260206004820152601760248201527f546865207469636b65742068617320657870697265642e00000000000000000060448201526064016101ff565b6104eb6020890189610ef2565b6001600160a01b03166108fc89604001359081150290604051600060405180830381858888f19350505050158015610527573d6000803e3d6000fd5b50505050505050505050505050565b6000816040516020016105499190610f0f565b604051602081830303815290604052805190602001209050806000808460200160208101906105789190610ef2565b6001600160a01b03166001600160a01b0316815260200190815260200160002060008460a00135815260200190815260200160002054146105fb5760405162461bcd60e51b815260206004820152601960248201527f496e76616c696420657363726f7720656e74727920686173680000000000000060448201526064016101ff565b8160800135421161064e5760405162461bcd60e51b815260206004820152601e60248201527f46756e647320617265206e6f74207265636c61696d61626c65207965742e000060448201526064016101ff565b61065e6040830160208401610ef2565b6001600160a01b03166108fc83604001359081150290604051600060405180830381858888f1935050505015801561069a573d6000803e3d6000fd5b50600080806106ac6020860186610ef2565b6001600160a01b0316815260208082019290925260409081016000908120948152939091529091205550565b6000826040516020016106eb9190610e76565b604051602081830303815290604052805190602001209050600061071a82848036038101906100ea9190610ed6565b90506001600160a01b0381166107366080860160608701610ef2565b6001600160a01b03161461079d5760405162461bcd60e51b815260206004820152602860248201527f546865207469636b6574206d757374206265207369676e6564206279207468656044820152671039b2b73232b91760c11b60648201526084016101ff565b81600160006107b26080880160608901610ef2565b6001600160a01b03166001600160a01b031681526020019081526020016000206000866020013581526020019081526020016000208190555050505050565b600080806108026020850185610ef2565b6001600160a01b031681526020808201929092526040908101600090812060a08601358252909252902054905080156108985760405162461bcd60e51b815260206004820152603260248201527f546865726520697320616c726561647920616e20657363726f7720656e747279604482015271103337b9103a343290383932b4b6b0b3b29760711b60648201526084016101ff565b6000826040516020016108ab9190610f0f565b604051602081830303815290604052805190602001209050806000808560000160208101906108da9190610ef2565b6001600160a01b031681526020808201929092526040908101600090812094815293909152909120555050565b6040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c81018390526000908190605c0160408051601f198184030181528282528051602091820120868301518751888401516000875293860180865283905260ff9091169385019390935260608401929092526080830152915060019060a0016020604051602081039080840390855afa1580156109b1573d6000803e3d6000fd5b5050604051601f19015195945050505050565b6000816040516020016109d79190610f0f565b60405160208183030381529060405280519060200120905080600080846020016020810190610a069190610ef2565b6001600160a01b03166001600160a01b0316815260200190815260200160002060008381526020019081526020016000205414610a855760405162461bcd60e51b815260206004820152601b60248201527f546865726520617265206e6f2066756e647320746f20636c61696d000000000060448201526064016101ff565b8160800135421115610ae55760405162461bcd60e51b8152602060048201526024808201527f54686520657363726f7720636c61696d20706572696f642068617320657870696044820152633932b21760e11b60648201526084016101ff565b8160600135421015610b495760405162461bcd60e51b815260206004820152602760248201527f54686520657363726f7720636c61696d20706572696f6420686173206e6f74206044820152661cdd185c9d195960ca1b60648201526084016101ff565b8383604051602001610b5c929190610f72565b604051602081830303815290604052805190602001208260a0013514610bb85760405162461bcd60e51b815260206004820152601160248201527024b73b30b634b210383932b4b6b0b3b29760791b60448201526064016101ff565b610bc56020830183610ef2565b6001600160a01b03166108fc83604001359081150290604051600060405180830381858888f19350505050158015610c01573d6000803e3d6000fd5b5060008080610c136020860186610ef2565b6001600160a01b03168152602080820192909252604090810160009081209481529390915290912055505050565b600060c08284031215610c5357600080fd5b50919050565b600060608284031215610c5357600080fd5b6000806000806000806103208789031215610c8557600080fd5b610c8f8888610c41565b9550610c9e8860c08901610c59565b9450610cae886101208901610c41565b9350610cbe886101e08901610c59565b9250610cce886102408901610c41565b915061030087013590509295509295509295565b600060c08284031215610cf457600080fd5b610cfe8383610c41565b9392505050565b6000806101208385031215610d1957600080fd5b610d238484610c41565b9150610d328460c08501610c59565b90509250929050565b600060608284031215610d4d57600080fd5b6040516060810181811067ffffffffffffffff82111715610d7e57634e487b7160e01b600052604160045260246000fd5b80604052508091508235815260208301356020820152604083013560ff81168114610da857600080fd5b6040919091015292915050565b60008060808385031215610dc857600080fd5b82359150610d328460208501610d3b565b600080600060e08486031215610dee57600080fd5b833567ffffffffffffffff80821115610e0657600080fd5b818601915086601f830112610e1a57600080fd5b813581811115610e2957600080fd5b8760208260051b8501011115610e3e57600080fd5b602092830195509350610e55918791508601610c41565b90509250925092565b6001600160a01b0381168114610e7357600080fd5b50565b813581526020808301359082015260c081016040830135610e9681610e5e565b6001600160a01b039081166040840152606084013590610eb582610e5e565b1660608301526080838101359083015260a092830135929091019190915290565b600060608284031215610ee857600080fd5b610cfe8383610d3b565b600060208284031215610f0457600080fd5b8135610cfe81610e5e565b60c081018235610f1e81610e5e565b6001600160a01b039081168352602084013590610f3a82610e5e565b8082166020850152505060408301356040830152606083013560608301526080830135608083015260a083013560a083015292915050565b6020808252810182905260006001600160fb1b03831115610f9257600080fd5b8260051b8085604085013760009201604001918252509291505056fea2646970667358221220d8abd7c2c5f333b46ae996832547c6721b3f4735bf1a7bc336127006c7110af764736f6c634300080a0033";

type L2ContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L2ContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class L2Contract__factory extends ContractFactory {
  constructor(...args: L2ContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<L2Contract> {
    return super.deploy(overrides || {}) as Promise<L2Contract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): L2Contract {
    return super.attach(address) as L2Contract;
  }
  connect(signer: Signer): L2Contract__factory {
    return super.connect(signer) as L2Contract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L2ContractInterface {
    return new utils.Interface(_abi) as L2ContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L2Contract {
    return new Contract(address, _abi, signerOrProvider) as L2Contract;
  }
}
