import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { farmsConfig } from 'config/constants'
import { ChainId } from '@satoshicrypto/sdk'
import { QuoteToken } from '../../config/constants/types'

const chainId = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig[chainId].map(async (farmConfig) => {
      const lpAdress = getAddress(farmConfig.lpAddresses)
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(farmConfig.tokenAddresses),
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: getAddress(farmConfig.quoteTokenAdresses),
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[chainId] : lpAdress,
          name: 'balanceOf',
          params: [getMasterChefAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: getAddress(farmConfig.tokenAddresses),
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: getAddress(farmConfig.quoteTokenAdresses),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)
      
      const [info, totalAllocPoint, poolInfo, satoshiPerBlock, depositedSatoshi] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'satoshiPerBlock',
        },
        {
          address: getMasterChefAddress(),
          name: 'depositedSatoshi',
        },
      ])

      let tokenAmount
      let lpTotalInQuoteToken
      let tokenPriceVsQuote

      const quoteTokenBlanceLP1 = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(quoteTokenDecimals));
      const tokenBalanceLP1 = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals));
      const lpTokenBalanceMC1 = farmConfig.pid === 0 ? depositedSatoshi : lpTokenBalanceMC

      if (farmConfig.isTokenOnly) {
        tokenAmount = new BigNumber(lpTokenBalanceMC1).div(new BigNumber(10).pow(tokenDecimals));
        
        let quoteTokenBUSD = QuoteToken.BUSD;
        if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) quoteTokenBUSD = QuoteToken.USDC
        if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) quoteTokenBUSD = QuoteToken.bscBUSD
        if (farmConfig.tokenSymbol === quoteTokenBUSD && farmConfig.quoteTokenSymbol === quoteTokenBUSD) {
          tokenPriceVsQuote = new BigNumber(1)
        } else {
          tokenPriceVsQuote = quoteTokenBlanceLP1.div(tokenBalanceLP1)
        }
        lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote)
      } else {
        // Ratio in % a LP tokens that are in staking, vs the total number in circulation
        const lpTokenRatio = new BigNumber(lpTokenBalanceMC1).div(new BigNumber(lpTotalSupply))

        // Total value in staking in quote token value
        lpTotalInQuoteToken = quoteTokenBlanceLP1.times(new BigNumber(2)).times(lpTokenRatio)

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(lpTokenRatio)
          
        if (tokenAmount.comparedTo(0) > 0) {
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        } else {
          tokenPriceVsQuote = quoteTokenBlanceLP1.div(tokenBalanceLP1)
        }
      }

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
        depositFeeBP: poolInfo.depositFeeBP,
        harvestLockup: poolInfo.harvestInterval,
        satoshiPerBlock: new BigNumber(satoshiPerBlock).toNumber(),
        lpTotalSupply: new BigNumber(lpTotalSupply).div(new BigNumber(10).pow(tokenDecimals)).toJSON(),
        lpTokenBalanceMC: farmConfig.pid === 0 ? new BigNumber(depositedSatoshi).div(new BigNumber(10).pow(tokenDecimals)).toJSON() : new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals)).toJSON(),
      }
    }),
  )
  return data
}

export default fetchFarms
