import { PoolConfig, QuoteToken, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 98, // V1
    tokenName: 'bscBUSD',
    tokenLabel: 'bscBUSD',
    tokenAddress: '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    stakingTokenDecimals: 18,
    contractAddress: {
      1666700000: '',
      1666600000: '0x4f735956869Ee1e54c795eC7709a318c7EC8D829',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://satoshicrypto.finance',
    harvest: true,
    tokenPerBlock: '0.005',
    sortOrder: 999,
    isFinished: false,
    tokenDecimals: 18,
    isBush: true,
    isLp: false,
    bushVersion: 1,
    getUrl: '/#/swap?outputCurrency=0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  },
  {
    sousId: 99, // V1
    tokenName: 'WONE',
    tokenLabel: 'WONE',
    tokenAddress: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    stakingTokenDecimals: 18,
    contractAddress: {
      1666700000: '',
      1666600000: '0x80aE18C798d4CB59076CAF60378A6f498B03469d',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.binance.com',
    harvest: true,
    tokenPerBlock: '0.000015',
    sortOrder: 999,
    isFinished: false,
    tokenDecimals: 18,
    isBush: true,
    isLp: false,
    bushVersion: 1,
    getUrl: '/#/swap?outputCurrency=0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  },
]

export default pools
