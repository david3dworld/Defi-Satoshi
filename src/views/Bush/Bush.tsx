import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, HelpIcon, Link, Text, Flex } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools, usePriceEthBnb, usePriceSatoshiBusd, useFarmFromPid } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PoolCard from '../Pools/components/PoolCard'
import PoolTabButtons from '../Pools/components/PoolTabButtons'
import Divider from '../Pools/components/Divider'
import Coming from '../Pools/components/Coming'
import useApePrice from '../../hooks/useApePrice'

const chainId = process.env.REACT_APP_CHAIN_ID


const StyledSection = styled.div`
  text-align: center;

  padding-top: 100px;
  padding-bottom: 30px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledPage = styled(Page)`
  min-height: unset;
`

const StyledHeader = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 55%;
  }
`

const StyledHeadingL = styled(Heading)`
  font-family: Julee;
  font-size: 46px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 76px;
  }
`

const StyledHeadingM = styled(Heading)`
  font-family: Julee;
  font-size: 36px;
  text-align: left;
  color: #fff;

  & > span {
    font-family: Julee;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 48px;
  }
`

const StyledHeadingS = styled(Heading)`
  font-family: Julee;
  font-size: 28px;
  text-align: left;
  color: #fff;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 32px;
  }
`

const StyledHeadingText = styled(Text)`
  font-size: 18px;
  text-align: left;
  color: #a9a9ff;

  ${({ theme }) => theme.mediaQueries.sm} {
    
  }
`

const PageTopImage = styled.img`
  width: 200px;
  margin-bottom: 30px;
`


const Bush: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const ethPriceBnb = usePriceEthBnb()
  const cakePrice = usePriceSatoshiBusd()
  const [apePrice, setApePrice] = useState(0)
  const block = useBlock()
  const [stackedOnly, setStackedOnly] = useState(false)

  const apeReserve = useApePrice()
  apeReserve.then(setApePrice)

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    let quoteTokenBNB = QuoteToken.BNB;
    let quoteTokenBUSD = QuoteToken.BUSD;
    if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) {
      quoteTokenBNB = QuoteToken.FTM
      quoteTokenBUSD = QuoteToken.USDC
    }
    if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) {
      quoteTokenBNB = QuoteToken.ONE
      quoteTokenBUSD = QuoteToken.bscBUSD
    }

    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === quoteTokenBNB) {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === quoteTokenBUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    // const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)
    const rewardTokenFarm = farms.find((s) => s.tokenSymbol === pool.tokenName)
    let stakingTokenPriceVsQuote = stakingTokenFarm?.tokenPriceVsQuote
    const rewardTokenPriceVsQuote = rewardTokenFarm?.tokenPriceVsQuote
    if (pool.tokenName === 'BANANA') {
      stakingTokenPriceVsQuote = new BigNumber(apePrice)
    }
console.log('-- poolsWithApy stakingTokenFarm : ', stakingTokenFarm)
console.log('-- poolsWithApy rewardTokenFarm : ', rewardTokenFarm)
console.log('-- poolsWithApy bnbPriceUSD : ', bnbPriceUSD.toNumber())
    // tmp mulitplier to support ETH farms
    // Will be removed after the price api
    const tempStakingMultiplier = stakingTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1
    const tempRewardMultiplier = rewardTokenFarm?.quoteTokenSymbol === 'ETH' ? ethPriceBnb : 1

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenPriceVsQuote).times(tempStakingMultiplier)
    const rewardTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(rewardTokenPriceVsQuote).times(tempRewardMultiplier)
    // const rewardTokenPriceInBNB = priceToBnb(
    //   pool.tokenName,
    //   rewardTokenFarm?.tokenPriceVsQuote,
    //   rewardTokenFarm?.quoteTokenSymbol,
    // )

    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(new BigNumber(getBalanceNumber(pool.totalStaked, pool.stakingTokenName)))
    let apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100) 
    
    if (rewardTokenFarm.quoteTokenSymbol === 'BNB') {
      apy = apy.multipliedBy(bnbPriceUSD.toJSON())
    }

    // total liquidity
    let totalValue = new BigNumber(0)
    if (pool.stakingTokenName === QuoteToken.SAT) {
      totalValue = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).multipliedBy(cakePrice)
    }

    // console.table({
    //   'tokenName': pool.tokenName,
    //   'stakingTokenFarm?.tokenPriceVsQuote': stakingTokenFarm?.tokenPriceVsQuote,
    //   stakingTokenPriceInBNB: stakingTokenPriceInBNB.toJSON(),
    //   rewardTokenPriceInBNB: rewardTokenPriceInBNB.toJSON(),
    //   totalRewardPricePerYear: totalRewardPricePerYear.toJSON(),
    //   totalStakingTokenInPool: totalStakingTokenInPool.toJSON(),
    //   'pool.tokenPerBlock': pool.tokenPerBlock,
    //   'pool.totalStaked': pool.totalStaked,
    //   'getBalanceNumber(pool.totalStaked)': getBalanceNumber(pool.totalStaked),
    //   BLOCKS_PER_YEAR: BLOCKS_PER_YEAR.toJSON(),
    //   'stakingTokenFarm?.quoteTokenSymbol': stakingTokenFarm?.quoteTokenSymbol,
    // })

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
      totalValue,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const stackedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const Header = styled.div`
    padding: 32px 0px;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};

    padding-left: 16px;
    padding-right: 16px;

    margin-bottom: 20px;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 24px;
      padding-right: 24px;
    }
  `

  const AddressLink = styled(Link)`
    display: inline-block;
    font-weight: 400;
    font-size: 12px;
    white-space: nowrap;

    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 16px;
      width: auto;
    }
  `

  return (
    <>
        
      <Page>
        <StyledSection>
          <StyledPage style={{minHeight: 'unset'}}>
            <Flex style={{flexDirection: 'column'}}>          
              <StyledHeader style={{width: '100%'}}>
                <PageTopImage src="/images/page-top-launchpad.png"/>
                <StyledHeadingM as="h1" size="xl" color="secondary" mb="10px" style={{textAlign: 'center'}}>
                  <span style={{color: '#32ffe4'}}>
                  {TranslateString(999, 'Stake SAT to Earn New Tokens')}
                  </span>
                </StyledHeadingM>
                <StyledHeadingText style={{textAlign: 'center'}}>
                  {TranslateString(580, 'Rewards are calculated per block.')}
                </StyledHeadingText>                
              </StyledHeader>
            </Flex>          
          </StyledPage>
        </StyledSection>
      
        <PoolTabButtons stackedOnly={stackedOnly} setStackedOnly={setStackedOnly} />

        <FlexLayout>
          <Route exact path={`${path}`}>
            <>
              {stackedOnly
                ? orderBy(stackedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
                : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
              <Coming />
            </>
          </Route>
          <Route path={`${path}/history`}>
            {orderBy(finishedPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
          </Route>
        </FlexLayout>
      </Page>
    </>
  )
}

export default Bush
