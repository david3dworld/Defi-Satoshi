import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address, FarmConfig, QuoteToken } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL, PCS_ADD_LIQUIDITY_URL, PCS_EXCHANGE_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useI18n from 'hooks/useI18n'
import getSwapUrlPathParts from '../../../../utils/getSwapUrlPathParts'

export interface AprProps {
  value: number
  multiplier: string
  lpLabel: string
  quoteTokenAdresses: Address
  quoteTokenSymbol: QuoteToken
  tokenAddresses: Address
  cakePrice: BigNumber
  originalValue: BigNumber
  hideButton?: boolean
  farm: FarmConfig
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  cakePrice,
  originalValue,
  hideButton = false,
  farm,
}) => {
  const TranslateString = useI18n()
  const displayApr = value ? `${value}%` : TranslateString(656, 'Loading...')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${farm.isPsc ? PCS_ADD_LIQUIDITY_URL : BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const swapeUrlPathParts = getSwapUrlPathParts({ tokenAddresses })
  const addTokenUrl = `${farm.isPsc ? PCS_EXCHANGE_URL : BASE_EXCHANGE_URL}/${swapeUrlPathParts}`
  const getUrl = farm.isTokenOnly ? addTokenUrl : addLiquidityUrl
  return (
    <Container>
      <AprWrapper>{displayApr}</AprWrapper>
      {!hideButton && (
        <ApyButton lpLabel={lpLabel} cakePrice={cakePrice} apy={originalValue} addLiquidityUrl={getUrl} />
      )}
    </Container>
  )
}

export default Apr
