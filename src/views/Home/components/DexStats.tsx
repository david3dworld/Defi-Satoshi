import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, Text } from '@satoshicrypto/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceBnbBusd, usePriceSatoshiBusd, usePriceEthBusd } from 'state/hooks'
import { ChainId } from '@satoshicrypto/sdk'
import CardValue from './CardValue'
import NativeLP from './NativeLP'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
`

const DexStats = () => {
  const cakePrice = usePriceSatoshiBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()
  const farmsLP = useFarms()

  const totalLiquidity = useRef(Number.MIN_VALUE)

  const getLiquidityInfo = () => {
    const nativeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && farm.tokenSymbol === 'SAT' && farm.isTokenOnly !== true)

    calculateLiquidity(nativeFarms)

    return 100;
  }

  const calculateLiquidity = useCallback(
    (nativeFarms) => {
      nativeFarms.map((farm) => {
        return farm;
      })
    },
    [],
  )
  
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg" mb="24px">
          DEX Stats
        </Heading>
        <Flex justifyContent="space-between">
          <Text fontSize="14px">SAT Liquidity</Text>
          <Text fontSize="14px">${getLiquidityInfo()}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="14px">24H Volume</Text>
          <Text fontSize="14px">${getLiquidityInfo()}</Text>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default DexStats
