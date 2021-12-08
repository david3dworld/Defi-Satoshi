import { ChainId } from '@satoshicrypto/sdk'
import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CAKE_PER_BLOCK = new BigNumber(1)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const BSC_BLOCK_TIME = 3
export const CAKE_POOL_PID = {
  [ChainId.MAINNET]: 1,
  [ChainId.BSCTESTNET]: 1,
  [ChainId.FANTOMNET]: 6,
  [ChainId.FANTOMTESTNET]: 6,
  [ChainId.HARMONYNET]: 1,
  [ChainId.HARMONYTESTNET]: 1,
}
export const BASE_URL = 'https://satoshicrypto.finance'
export const BASE_EXCHANGE_URL = 'https://swap.satoshicrypto.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const PCS_EXCHANGE_URL = 'https://swappcs.satoshicrypto.finance'
export const PCS_ADD_LIQUIDITY_URL = `${PCS_EXCHANGE_URL}/#/add`
export const PCS_LIQUIDITY_POOL_URL = `${PCS_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 10
export const DEFI_LAUNCH_TIME = 1637625600000 
