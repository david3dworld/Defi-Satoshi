import { PoolConfig, QuoteToken, PoolCategory } from '../types'

const pools: PoolConfig[] = [
  {
    sousId: 98, // V1
    tokenName: 'BUSD',
    tokenLabel: 'BUSD',
    tokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    stakingTokenDecimals: 18,
    contractAddress: {
      97: '',
      56: '0x6C989724629D4eC5ae4DC250144edEAd925A8545',
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
    tokenName: 'WBNB',
    tokenLabel: 'WBNB',
    tokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    stakingTokenName: QuoteToken.SAT,
    stakingTokenAddress: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    stakingTokenDecimals: 18,
    contractAddress: {
      97: '',
      56: '0x52deA079eD92b9B9038Ab7D8129a8585Cb81697d',
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
