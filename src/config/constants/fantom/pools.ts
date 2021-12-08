import { PoolConfig, QuoteToken, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 98, // V1
    tokenName: 'USDC',
    tokenLabel: 'USDC v1',
    tokenAddress: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
    stakingTokenDecimals: 18,
    contractAddress: {
      97: '',
      56: '0x53d5BA56C7451A1009a4CEa9116F23Fc1dd294DE',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://satoshicrypto.finance',
    harvest: true,
    tokenPerBlock: '0.00744047619',
    sortOrder: 999,
    isFinished: false,
    tokenDecimals: 6,
    isBush: true,
    isLp: false,
    bushVersion: 1,
    getUrl: '/#/swap?outputCurrency=0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
  },
  {
    sousId: 99, // V1
    tokenName: 'WBNB',
    tokenLabel: 'WBNB v1',
    tokenAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
    stakingTokenDecimals: 18,
    contractAddress: {
      97: '',
      56: '0xEe105c10cA860FCb37964533bc85C9ACCD7853c4',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.binance.com',
    harvest: true,
    tokenPerBlock: '0.00002703373016',
    sortOrder: 999,
    isFinished: false,
    tokenDecimals: 18,
    isBush: true,
    isLp: false,
    bushVersion: 1,
    getUrl: '/#/swap?outputCurrency=0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
  },
]

export default pools
