import React, { useMemo } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text, Link } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityFarms } from 'config/constants'
import { DualTag } from 'components/Tags'

import BigNumber from 'bignumber.js'
import { 
  useFarms, 
  usePriceBnbBusd, 
  usePriceSatoshiBusd, 
  usePriceEthBusd,
  usePriceUsdtBusd,
} from 'state/hooks'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import Fee, { FeeProps } from '../Fee'
import { QuoteToken } from '../../../../../config/constants/types'
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL, PCS_ADD_LIQUIDITY_URL, PCS_EXCHANGE_URL } from '../../../../../config'
import getSwapUrlPathParts from '../../../../../utils/getSwapUrlPathParts'

const chainId = process.env.REACT_APP_CHAIN_ID

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  fee: FeeProps
  details: FarmWithStakedValue
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  margin-left: 8px;
`

const StyledLink = styled(Link)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const LpPriceContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }

  span {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, multiplier, liquidity, fee }) => {
  const farm = details

  const TranslateString = useI18n()
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, tokenSymbol, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${farm.isPsc ? PCS_ADD_LIQUIDITY_URL : BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const swapeUrlPathParts = getSwapUrlPathParts({ tokenAddresses })
  const addTokenUrl = `${farm.isPsc ? PCS_EXCHANGE_URL : BASE_EXCHANGE_URL}/${swapeUrlPathParts}`
  const getUrl = farm.isTokenOnly ? addTokenUrl : addLiquidityUrl
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://bscscan.com/address/${lpAddress}`
  const info = `https://pancakeswap.info/pair/${lpAddress}`
  const cakePrice = usePriceSatoshiBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const usdtPrice = usePriceUsdtBusd()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }

    let quoteTokenBNB = QuoteToken.BNB
    if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) quoteTokenBNB = QuoteToken.FTM
    if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) quoteTokenBNB = QuoteToken.ONE

    if (farm.quoteTokenSymbol === quoteTokenBNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }    
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.USDT) {
      return usdtPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, usdtPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const lpPrice = useMemo(() => {
    if (farm.isTokenOnly) {
      return null
    }

    return Number(totalValue) / Number(farm.lpTokenBalanceMC)
  }, [farm, totalValue])

  const lpTokenPriceFormated = lpPrice
    ? `~$${Number(lpPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  return (
    <Container>
      <InfoContainer>
        <StakeContainer>
          Stake:
          <StyledLinkExternal href={`${getUrl}`}>{lpLabel}</StyledLinkExternal>
        </StakeContainer>
        <StyledLink href={bsc} external>
          {TranslateString(999, 'BscScan')}
        </StyledLink>
        <StyledLink href={info} external>
          {TranslateString(999, 'Info site')}
        </StyledLink>
        {!farm.isTokenOnly && (
          <LpPriceContainer>
            Lp Price:
            <span>{lpTokenPriceFormated}</span>
          </LpPriceContainer>
        )}
        <TagsContainer>{dual ? <DualTag /> : null}</TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>APR</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Deposit fee')}</Text>
          <Fee {...fee} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...farm} />
        <StakedAction {...farm} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
