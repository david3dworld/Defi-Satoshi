import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, Text } from '@satoshicrypto/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { 
  useFarms, 
  usePriceBnbBusd, 
  usePriceSatoshiBusd, 
  usePriceEthBusd,
  usePriceUsdtBusd,
} from 'state/hooks'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import { ChainId } from '@satoshicrypto/sdk'
import CardValue from './CardValue'
import NativeLP from './NativeLP'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border: 0px solid #c962d4;

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

const LPWorth = () => {
  const cakePrice = usePriceSatoshiBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const usdtPrice = usePriceUsdtBusd()
  const farmsLP = useFarms()

  

  const NativeLPs = (): JSX.Element => {
    const nativeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && farm.tokenSymbol === 'SAT' && farm.isTokenOnly !== true)
    const nativeFarmsList = nativeFarms.map((farm)=>{
      return (
        <NativeLP
          key={farm.pid}
          farm={farm}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethPrice={ethPrice}
          usdtPrice={usdtPrice}
        />
      )
    })
    return <div>{nativeFarmsList}</div>
  }

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg" mb="24px">
          SAT LP Worth
        </Heading>
        <NativeLPs />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default LPWorth
