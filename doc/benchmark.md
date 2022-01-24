# Summary

We argue that SAFE would lead to cheaper swap protocols, especially where exit chain fees are lower than entry chain fees by observing an order of magnitude reduction in fees compared with NXTP.

# Setup

- We’re using a batch size of 100 swaps for SAFE
- For NXTP we multiply costs of one transfer by 100 to mimic “batching”
- Tokens used:
  - For SAFE, a batch contains swaps for 5 different erc20 tokens
  - For nxtp, each swap is independent (there is no batching), so 1 token type is used.
- The benchmarks avoid “cold” stores (modifying a zero storage value to non-zero). So the contracts and swap addresses are primed to hold tokens.
- We assume a gas cost of 154.22 gwei for mainnet based on average gas cost on **January 17th**
- We assume a cost of 0.001 gwei for Optimism gas cost.
- For SAFE each swap has a different exit chain recipient

# Computation

All gas is measured on L1 testnets. For SAFE, gas is measured using a local testnet. For nxtp, gas is measured on Ropsten and Gorli. L2 gas costs are then computed formulaically.

# Results

## Optimism to Mainnet Summary

|               | NXTP                                                                           | SAFE                                                                          |
| ------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L1 cost(gwei) | 21798000 gas \* 154.22 gwei = 3361687560 gwei                                  | 1,150,678 gas \* 154.22 gwei = 177457561.16 gwei                              |
| L2 cost(gwei) | 1,756,000 gas \* 154.22 gwei + 18,545,900 gas \* 0.001 gwei = 270828865.9 gwei | 502,376 gas \* 154.22 gwei + 16,830,846 gas \* 0.001 gwei = 77493257.566 gwei |
| Total         | 3361687560 gwei + 270828865.9 gwei = 3632516425.9 gwei = 3.632516425.9 ETH     | 177457561.16 + 77493257.566 = 254950818.726 gwei 0.254950818726 ETH           |

## Calculations

|                                       | nxtp (formula)                                                                                              | nxtp                                                                                                                   | SAFE (formula)                                                                                           | SAFE                                                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Exit chain gas for batch of 100       | (Ropsten prepare gas + Ropsten fulfill gas ) \* batchSize                                                   | (117,477 + 67,982) \* 100 = 18,545,900                                                                                 | exit chain deposit(100 calls) gas + exit chain authorize gas + exit chain claim gas                      | 14,249,800 + 1,092,796 + 1,488,250 = 16,830,846                                                                     |
| Exit Chain Optimism Calldata Fee      | (Ropsten prepare optimism fee + Ropsten fulfill optimism fee) \* batchSize                                  | (6,556 + 11,004) \* 100 = 1,756,000                                                                                    | exit chain deposit(100 calls) optimism fee + exit chain authorize optimism fee + exit chain optimism fee | 493,200 + 5,256 + 3,920 = 502,376                                                                                   |
| Entry chain gas for batch of 100      | (Goerli prepare gas + Goerli fulfill gas) \* batchSize                                                      | (96,731 + 121,249) \* 100 = 21,798,000                                                                                 | claimBatch gas                                                                                           | 1,150,678                                                                                                           |
| Entry Chain Optimism Calldata Fee     | (Goerli prepare optimism fee + Goerli fulfill optimism fee) \* batchSize                                    | (16,528 + 13,572) \* 100 = 3,010,000                                                                                   | claimBatch optimism fee                                                                                  | 92,752                                                                                                              |
| Total $ cost for Optimism to L1       | exit chain gas \* L2 fee + ( entry chain gas + exit chain optimism fee ) \* L1 gas price                    | 18,545,900 \* 0.001 + (21,798,000 + 1,756,000) \* 154.22 = 3632516425.9 = 3.6325164259 ETH                             | exit chain gas \* L2 fee + ( entry chain gas + exit chain optisimism fee +) \* L1 gas price              | 16,830,846 \* 0.001 + (1,150,678 + 502,376) \* 154.22 = 254950818.726 = 0.254950818726 ETH                          |
| Total $ cost for Optimism to Optimism | exit optimism fee \* L1 gas price + exit gas \* L2 fee + entry optimism fee \* L1 gas + entry gas \* L2 fee | 1,756,000 \* 154.22 + 18,545,900 \* 0.001 + 3,010,000 \* 154.22 + 21,798,000 \* 0.001 = 735052863.9 = 0.7350528639 ETH | exit optimism fee \* L1 gas price + exit gas \* l2fee + entry optimism fee \* l1Gas + entry gas \* l2fee | 502,376 \* 154.22 + 16,863,946 \* 0.001 + 92,752 \* 154.22 + 1,150,678 \* 0.001 = 91798654.784 = 0.091798654784 ETH |

# Measurements

## nxtp gas costs

- Using [https://testnet.xpollinate.io/](https://testnet.xpollinate.io/)
- Transfer from Ropsten to Gorli
- Using address `0x731d94003be596Dfb195972C586547aCC88cB607` on both networks
- Using TEST token
- Infinite allowance is on. With infinite allowance, `approve` does not need to be called for the nxtp contract. There doesn’t seem to be a way to turn off infinite approval.

[Swap summary](https://testnet.connextscan.io/tx/0x1c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd)

### Contracts

Ropsten sender — [https://ropsten.etherscan.io/address/0x731d94003be596Dfb195972C586547aCC88cB607](https://ropsten.etherscan.io/address/0x731d94003be596Dfb195972C586547aCC88cB607)

Ropsten router — [https://ropsten.etherscan.io/address/0x7da9c10d785708353938c489b7728f7aef71313d](https://ropsten.etherscan.io/address/0x7da9c10d785708353938c489b7728f7aef71313d)

Gorli receiver — [https://goerli.etherscan.io/address/0x731d94003be596Dfb195972C586547aCC88cB607#tokentxns](https://goerli.etherscan.io/address/0x731d94003be596Dfb195972C586547aCC88cB607#tokentxns)

Gorli router — [https://goerli.etherscan.io/address/0x3f0f4343c1d1a49d1287ce6e4d8643e9542a99f2](https://goerli.etherscan.io/address/0x7da9c10d785708353938c489b7728f7aef71313d)

### Transactions

Ropsten prepare — [https://ropsten.etherscan.io/tx/0xac31b7d16480131c32ec8d9b59e467e0daede3aa01fdd10514db4901f8f6675c](https://ropsten.etherscan.io/tx/0xac31b7d16480131c32ec8d9b59e467e0daede3aa01fdd10514db4901f8f6675c)

TX data for rollup calldata publish:

```cpp
0xf9060981df8502b1b21fa38301db37948a3e48fd59e201e342d913092e508e539e14674a80b905e4d94593720000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d58000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d1682000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000005c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4701c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd0000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000061eb17a600000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000000000000000000000000000000000000000000003000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000050000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d16820000000000000000000000000000000000000000000000056b15bb71344b0000000000000000000000000000731d94003be596dfb195972c586547acc88cb6071c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd0000000000000000000000000000000000000000000000000000000061eb17a6c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000008a3e48fd59e201e342d913092e508e539e14674a000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d580000000000000000000000000000000000000000000000000000000061e72452000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000418bf45844c02ca8a51d88939cf2f203a52d24094e62b5400100009b5f10b87fd05fd305b3a1f76faf53b1beb14489e46b581b4684525b06d7aa299d1b896cd4221b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Ropsten fulfill — [https://ropsten.etherscan.io/tx/0x4d0342698f1b68038f9612d665e72c10a93c8c59f91625dacf29d4fa3bb21f97](https://ropsten.etherscan.io/tx/0x4d0342698f1b68038f9612d665e72c10a93c8c59f91625dacf29d4fa3bb21f97)

TX data for rollup calldata publish:

```cpp
0xf903884f8502bc74c75c830119de948a3e48fd59e201e342d913092e508e539e14674a80b903649b151a800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d58000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d1682000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000000000000000000000000000000000000000000000c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4701c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000061eb17a60000000000000000000000000000000000000000000000000000000000b4a43b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000041b2a86d9ad6ff78322398706d6a0ad3732863d17b3cd2302edd0798fabf6d600a02ff19df07ae46c0006665d8e40ed4e0de588fbaa53fab91d3298225112170261c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Gorli prepare — [https://goerli.etherscan.io/tx/0xe45f5f0e79dafd3cf5ce6f4a0201709d3b9e171bcb1bf6591a67d6a28f18ff57](https://goerli.etherscan.io/tx/0xe45f5f0e79dafd3cf5ce6f4a0201709d3b9e171bcb1bf6591a67d6a28f18ff57)

TX data for rollup calldata publish:

```cpp
0xf906081e85012a05f20083018a2d94b6cb4893f7e27adf1bdda1d283a6b344a1f57d5880b905e4d94593720000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d58000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d1682000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000005c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4701c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd0000000000000000000000000000000000000000000000056b15bb71344b00000000000000000000000000000000000000000000000000000000000061e9c62600000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000000000000000000000000000000000000000000003000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000050000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d16820000000000000000000000000000000000000000000000056b15bb71344b0000000000000000000000000000731d94003be596dfb195972c586547acc88cb6071c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd0000000000000000000000000000000000000000000000000000000061eb17a6c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000008a3e48fd59e201e342d913092e508e539e14674a000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d580000000000000000000000000000000000000000000000000000000061e72452000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000418bf45844c02ca8a51d88939cf2f203a52d24094e62b5400100009b5f10b87fd05fd305b3a1f76faf53b1beb14489e46b581b4684525b06d7aa299d1b896cd4221b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

Gorli fulfill — [https://goerli.etherscan.io/tx/0x4315324018b6e9bd8b2b0e0d04479dc934bfdbc1ae6bebc0b4e41544b6b106bf](https://goerli.etherscan.io/tx/0x4315324018b6e9bd8b2b0e0d04479dc934bfdbc1ae6bebc0b4e41544b6b106bf)

TX data for rollup calldata publish:

```cpp
0xf904ea8301391e8436c74ede83067db594683913b3a32ada4f8100458a3e1675425bdaa7df80b904c4b87b0b4c0000000000000000000000006512b8ef67fed2c7317fe835ddeb425161a1e2f90000000000000000000000000000000000000000000000000000000000000060000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000424b561d6f7000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d5800000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000000003649b151a800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b6cb4893f7e27adf1bdda1d283a6b344a1f57d58000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000007da9c10d785708353938c489b7728f7aef71313d000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000e71678794fff8846bff855f716b0ce9d9a78e8440000000000000000000000008a1cad3703e0beae0e0237369b4fcd04228d1682000000000000000000000000731d94003be596dfb195972c586547acc88cb607000000000000000000000000731d94003be596dfb195972c586547acc88cb6070000000000000000000000000000000000000000000000000000000000000000c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4701c46613eacafc4a6db519ca45b56357bdc3eafac333752b5881750c1d16d75cd000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000056b15bb71344b00000000000000000000000000000000000000000000000000000000000061e9c62600000000000000000000000000000000000000000000000000000000005ef94200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000041b2a86d9ad6ff78322398706d6a0ad3732863d17b3cd2302edd0798fabf6d600a02ff19df07ae46c0006665d8e40ed4e0de588fbaa53fab91d3298225112170261c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

### Data

**Note:** Optimism L1 fee were based on using this rough [script](https://github.com/statechannels/SAFE-protocol/blob/350ff57e8342baedab16cec8f5b2022f82a19dbe/scripts/get-raw.ts) to get the raw tx data and then calling `getL1GasUSed` on the [oracle](https://optimistic.etherscan.io/address/0x420000000000000000000000000000000000000f#readContract) contract on the optimism network.

|                 | Gas used | Optimism L1 fee |
| --------------- | -------- | --------------- |
| Ropsten prepare | 117,477  | 16,556          |
| Ropsten fulfill | 67,982   | 11,004          |
| Gorli prepare   | 96,731   | 16,528          |
| Gorli fulfill   | 121,249  | 13,572          |

SAFE contracts have also been deployed to Optimism — [https://www.notion.so/statechannels/Optimism-Test-Account-and-Contracts-b861223417374b3b929824df2be3dab6](https://www.notion.so/Optimism-Test-Account-and-Contracts-b861223417374b3b929824df2be3dab6)

## SAFE

Sample CI runs with benchmarks: [https://github.com/statechannels/SAFE-protocol/runs/4901063712?check_suite_focus=true](https://github.com/statechannels/SAFE-protocol/runs/4901063712?check_suite_focus=true)