import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
} from './actions'
import { State, Farm, Pool, ProfileState, TeamsState, AchievementState, PriceState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchPrices } from './prices'
import { QuoteToken } from '../config/constants/types'

const chainId = process.env.REACT_APP_CHAIN_ID
const ZERO = new BigNumber(0)
const usdDecimalsDiff = {
  [ChainId.MAINNET]: new BigNumber(1),
  [ChainId.BSCTESTNET]: new BigNumber(1),
  [ChainId.FANTOMNET]: new BigNumber(10).pow(12),
  [ChainId.FANTOMTESTNET]: new BigNumber(10).pow(12),
  [ChainId.HARMONYNET]: new BigNumber(1),
  [ChainId.HARMONYTESTNET]: new BigNumber(1),
}

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)
  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Bush

export const useBushs = (): Pool[] => {
  const bushs = useSelector((state: State) => state.pools.data)
  return bushs
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = { // BUSD-BNB LP
    [ChainId.MAINNET]: 5,
    [ChainId.BSCTESTNET]: 5,
    [ChainId.FANTOMNET]: 5,
    [ChainId.FANTOMTESTNET]: 5,
    [ChainId.HARMONYNET]: 11,
    [ChainId.HARMONYTESTNET]: 11,
  }
  const farm = useFarmFromPid(pid[chainId])
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceSatoshiBusd = (): BigNumber => {
  const pid = { // SAT-BUSD LP
    [ChainId.MAINNET]: 2,
    [ChainId.BSCTESTNET]: 2,
    [ChainId.FANTOMNET]: 6,
    [ChainId.FANTOMTESTNET]: 6,
    [ChainId.HARMONYNET]: 1,
    [ChainId.HARMONYTESTNET]: 1,
  }
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid[chainId])
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO  
}

export const usePriceEthBusd = (): BigNumber => {
  const pid = { // ETH-BUSD LP
    [ChainId.MAINNET]: 4,
    [ChainId.BSCTESTNET]: 4,
    [ChainId.FANTOMNET]: 4,
    [ChainId.FANTOMTESTNET]: 4,
    [ChainId.HARMONYNET]: 21, // 1ETH-ONE LP
    [ChainId.HARMONYTESTNET]: 21, // 1ETH-ONE LP
  }

  const farm = useFarmFromPid(pid[chainId])
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceEthBnb = (): BigNumber => {
  const priceBnbBusd = usePriceBnbBusd()
  const priceEthBusd = usePriceEthBusd()
  return priceEthBusd.div(priceBnbBusd)
}

export const usePriceUsdtBusd = (): BigNumber => {
  const pid = { // USDT-BUSD LP
    [ChainId.MAINNET]: 25,
    [ChainId.BSCTESTNET]: 25,
    [ChainId.FANTOMNET]: 16,
    [ChainId.FANTOMTESTNET]: 16,
    [ChainId.HARMONYNET]: 16,
    [ChainId.HARMONYTESTNET]: 16,
  }

  const farm = useFarmFromPid(pid[chainId])
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceChtrv2Busd = (): BigNumber => {
  const pid = { // USDT-BUSD LP
    [ChainId.MAINNET]: 27,
    [ChainId.BSCTESTNET]: 27,
    [ChainId.FANTOMNET]: 16,
    [ChainId.FANTOMTESTNET]: 16,
    [ChainId.HARMONYNET]: 16,
    [ChainId.HARMONYTESTNET]: 16,
  }

  const farm = useFarmFromPid(pid[chainId])
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[token.toLowerCase()]
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const bushs = useBushs()
  const bnbPrice = usePriceBnbBusd()
  const cakePrice = usePriceSatoshiBusd()
  const usdtPrice = usePriceUsdtBusd()
  
  
  let value = new BigNumber(0)

  // farms
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val

      let quoteTokenBNB = QuoteToken.BNB
      if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) quoteTokenBNB = QuoteToken.FTM
      if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) quoteTokenBNB = QuoteToken.ONE

      if (farm.quoteTokenSymbol === quoteTokenBNB) {
        val = bnbPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = cakePrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.USDT) {
        val = usdtPrice.times(farm.lpTotalInQuoteToken)
      } else {
        val = farm.lpTotalInQuoteToken
      }

      let valNumber = val;
      if( val && val.toNumber ) valNumber = val.toNumber();
      else valNumber = val
      
      value = value.plus(val)
    }
  }
  
  // bush (pools)
  for (let i = 0; i < bushs.length; i++) {
    const bush = bushs[i]

    // total liquidity
    let bushValue = new BigNumber(0)
    if (bush.stakingTokenName === QuoteToken.SAT) {
      bushValue = new BigNumber(bush.totalStaked).div(new BigNumber(10).pow(18)).multipliedBy(cakePrice)
    }
    
    if (!bushValue.isNaN()) {
      value = value.plus(bushValue)
    }
  }

  return value
}
