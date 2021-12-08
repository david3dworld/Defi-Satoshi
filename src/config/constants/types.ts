import {ChainId} from '@satoshicrypto/sdk'
import { TranslatableText } from 'state/types'
import BigNumber from 'bignumber.js'

const chainId = process.env.REACT_APP_CHAIN_ID

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  tokenSymbol: string
  releaseBlockNumber: number
  campaignId?: string
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'USDT' = 'USDT',
  'ETH' = 'ETH',
  'COMP' = 'COMP',
  'SUSHI' = 'SUSHI',
  'SAT' = 'SAT',
  'SATOSHI_BUSD_V2_LP' = 'SAT-BUSD V2 LP',
  'FTM' = 'FTM',
  'fUSD' = 'fUSD',
  'USDC' = 'USDC',
  'fBTC' = 'fBTC',
  'fETH' = 'fETH',
  'FRAX' = 'FRAX',
  'YFI' = 'YFI',
  'ONE' = 'ONE',
  'bscBUSD' = 'bscBUSD',
  'VIPER' = 'VIPER',
  'MOONI' = 'MOONI',
  'LONE' = 'LONE',
  'KURO' = 'KURO',
  'XYA' = 'XYA',
  'bscINJ' = 'bscINJ',
  '1ETH' = '1ETH',
  '1WBTC' = '1WBTC',
  'bscADA' = 'bscADA',
  'JENN' = 'JENN',
  'hMOCHI' = 'hMOCHI',
  'YIN' = 'YIN',
  'YANG' = 'YANG',
  'ONEMOON' = 'ONEMOON',
  '1SUSHI' = '1SUSHI',
  'CHTRv2' = 'CHTRv2',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56?: string
  250?: string
  4002?: string
  1666600000?: string
  1666700000?: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  decimals: number
  quoteDecimals: number
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  isVisible?: boolean
  isV2?: boolean
  isPsc?: boolean
  isOldPsc?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  tokenLabel: string
  tokenAddress: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  stakingTokenDecimals?: number
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  isBush?: boolean
  isLp?: boolean
  bushVersion?: number
  tokenDecimals: number
  depositFee?: number
  getUrl?: string
  totalValue?: BigNumber
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}
