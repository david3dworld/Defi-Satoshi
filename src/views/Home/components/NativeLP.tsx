import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Text } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { Farm } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { QuoteToken } from 'config/constants/types'


const chainId = process.env.REACT_APP_CHAIN_ID

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  lpTotalSupply?: BigNumber
  lpPrice?: BigNumber
}

const Wrapper = styled.div`
  margin-top: 24px;
`

interface NativeLPProps {
  farm: FarmWithStakedValue
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  usdtPrice?: BigNumber
  provider?: ProviderType
}

const NativeLP: React.FC<NativeLPProps> = ({ farm, bnbPrice, cakePrice, usdtPrice, ethPrice }) => {
  const TranslateString = useI18n()

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
  }, [bnbPrice, cakePrice, usdtPrice, ethPrice, farm])

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
    <Flex justifyContent="space-between">
      <Text fontSize="14px">{farm.lpSymbol}</Text>
      <Text fontSize="14px">{lpTokenPriceFormated}</Text>
    </Flex>
  )
}

export default NativeLP
