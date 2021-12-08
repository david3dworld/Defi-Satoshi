import {ChainId} from '@satoshicrypto/sdk'

import bscContracts from './bsc/contracts'
import bscFarms from './bsc/farms'
import bscIfo from './bsc/ifo'
import bscNfts from './bsc/nfts'
import bscPools from './bsc/pools'
import bscTeams from './bsc/teams'

import fantomContracts from './fantom/contracts'
import fantomFarms from './fantom/farms'
import fantomIfo from './fantom/ifo'
import fantomNfts from './fantom/nfts'
import fantomPools from './fantom/pools'
import fantomTeams from './fantom/teams'

import harmonyContracts from './harmony/contracts'
import harmonyFarms from './harmony/farms'
import harmonyIfo from './harmony/ifo'
import harmonyNfts from './harmony/nfts'
import harmonyPools from './harmony/pools'
import harmonyTeams from './harmony/teams'

const contracts = {
  [ChainId.MAINNET]: bscContracts,
  [ChainId.BSCTESTNET]: bscContracts,
  [ChainId.FANTOMNET]: fantomContracts,
  [ChainId.FANTOMTESTNET]: fantomContracts,
  [ChainId.HARMONYNET]: harmonyContracts,
  [ChainId.HARMONYTESTNET]: harmonyContracts,
}

const farmsConfig = {
  [ChainId.MAINNET]: bscFarms,
  [ChainId.BSCTESTNET]: bscFarms,
  [ChainId.FANTOMNET]: fantomFarms,
  [ChainId.FANTOMTESTNET]: fantomFarms,
  [ChainId.HARMONYNET]: harmonyFarms,
  [ChainId.HARMONYTESTNET]: harmonyFarms,
}

const bscCommunityFarms = bscFarms.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const fantomCommunityFarms = fantomFarms.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const harmonyCommunityFarms = harmonyFarms.filter((farm) => farm.isCommunity).map((farm) => farm.tokenSymbol)
const communityFarms = {
  [ChainId.MAINNET]: bscCommunityFarms,
  [ChainId.BSCTESTNET]: bscCommunityFarms,
  [ChainId.FANTOMNET]: fantomCommunityFarms,
  [ChainId.FANTOMTESTNET]: fantomCommunityFarms,
  [ChainId.HARMONYNET]: harmonyCommunityFarms,
  [ChainId.HARMONYTESTNET]: harmonyCommunityFarms,
}

const ifosConfig = {
  [ChainId.MAINNET]: bscIfo,
  [ChainId.BSCTESTNET]: bscIfo,
  [ChainId.FANTOMNET]: fantomIfo,
  [ChainId.FANTOMTESTNET]: fantomIfo,
  [ChainId.HARMONYNET]: harmonyIfo,
  [ChainId.HARMONYTESTNET]: harmonyIfo,
}

const nfts = {
  [ChainId.MAINNET]: bscNfts,
  [ChainId.BSCTESTNET]: bscNfts,
  [ChainId.FANTOMNET]: fantomNfts,
  [ChainId.FANTOMTESTNET]: fantomNfts,
  [ChainId.HARMONYNET]: harmonyNfts,
  [ChainId.HARMONYTESTNET]: harmonyNfts,
}

const poolsConfig = {
  [ChainId.MAINNET]: bscPools,
  [ChainId.BSCTESTNET]: bscPools,
  [ChainId.FANTOMNET]: fantomPools,
  [ChainId.FANTOMTESTNET]: fantomPools,
  [ChainId.HARMONYNET]: harmonyPools,
  [ChainId.HARMONYTESTNET]: harmonyPools,
}

const teams = {
  [ChainId.MAINNET]: bscTeams,
  [ChainId.BSCTESTNET]: bscTeams,
  [ChainId.FANTOMNET]: fantomTeams,
  [ChainId.FANTOMTESTNET]: fantomTeams,
  [ChainId.HARMONYNET]: harmonyTeams,
  [ChainId.HARMONYTESTNET]: harmonyTeams,
}

const SCAN_NAME = {
  [ChainId.MAINNET]: 'BscScan',
  [ChainId.BSCTESTNET]: 'BscScan',
  [ChainId.FANTOMNET]: 'FtmScan',
  [ChainId.FANTOMTESTNET]: 'FtmScan',
  [ChainId.HARMONYNET]: 'Harmony Explorer',
  [ChainId.HARMONYTESTNET]: 'Harmony Explorer',
}

export { contracts, farmsConfig, communityFarms, ifosConfig, nfts, poolsConfig, teams, SCAN_NAME }