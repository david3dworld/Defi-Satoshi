import { ChainId } from '@satoshicrypto/sdk'
import { poolsConfig } from 'config/constants'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import bushABIV1 from 'config/abi/bushV1.json'
import wbnbABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const chainId = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig[chainId].filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  let quoteTokenBNB = QuoteToken.BNB
  if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) quoteTokenBNB = QuoteToken.FTM
  if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) quoteTokenBNB = QuoteToken.ONE

  const nonBnbPools = poolsConfig[chainId].filter((p) => p.stakingTokenName !== quoteTokenBNB)
  const bnbPool = poolsConfig[chainId].filter((p) => p.stakingTokenName === quoteTokenBNB)
  const v1Bushs = poolsConfig[chainId].filter((p) => p.bushVersion === 1)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })
  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsV1Bushs = v1Bushs.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'depositFeeToBurn', // only available for version > 0
      sousId: poolConfig.sousId,
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(cakeABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)
  const V1BushsDepositFee = await multicall(bushABIV1, callsV1Bushs)

  const bushDepositFees = {}
  v1Bushs.forEach((poolConfig, index) => {
    bushDepositFees[poolConfig.sousId] = V1BushsDepositFee[index][0]
  })

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
      depositFee: bushDepositFees[p.sousId] ?? 0,
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
      depositFee: bushDepositFees[p.sousId] ?? 0,
    })),
  ]
}
