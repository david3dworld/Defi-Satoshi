import contracts from './contracts'
import { FarmConfig, QuoteToken } from '../types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    isOldPsc: false,
    isTokenOnly: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT',
    lpAddresses: {
      4002: '',
      250: '0x8f5225c2d56B3A2e32D3792a638648DcBA93e2E6', // SAT-FTM LP
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      4002: '',
      250: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 6,
    isV2: true,
    decimals: 18,
    quoteDecimals: 6,
    lpSymbol: 'SAT-USDC LP',
    lpAddresses: {
      4002: '',
      250: '0xfe7f8C6A0C0fEcA36d644a4E100728463a276534',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      4002: '',
      250: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 7,
    isV2: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-FTM LP',
    lpAddresses: {
      4002: '',
      250: '0x8f5225c2d56B3A2e32D3792a638648DcBA93e2E6',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      4002: '',
      250: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
    },
    quoteTokenSymbol: QuoteToken.FTM,
    quoteTokenAdresses: contracts.wftm,
  },
  {
    pid: 3,
    isPsc: true,
    isTokenOnly: true,
    decimals: 8,
    quoteDecimals: 6,
    lpSymbol: 'WBTC',
    lpAddresses: {
      4002: '',
      250: '0x6d134D63417DC67F57DbC9fcAaD4b4CBFaB3Af2F', // WBTC-USDC LP
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      4002: '',
      250: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 4,
    isPsc: true,
    isTokenOnly: true,
    decimals: 18,
    quoteDecimals: 6,
    lpSymbol: 'WETH',
    lpAddresses: {
      4002: '',
      250: '0x4556F6afA9B016a83052D459290573a5D83C8764', // WETH-USDC LP
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      4002: '',
      250: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 5,
    isPsc: true,
    isTokenOnly: true,
    decimals: 18,
    quoteDecimals: 6,
    lpSymbol: 'FTM',
    lpAddresses: {
      4002: '',
      250: '0xe7E90f5a767406efF87Fdad7EB07ef407922EC1D', // FTM-USDC
    },
    tokenSymbol: 'FTM',
    tokenAddresses: {
      4002: '',
      250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
]

export default farms
