import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { SCAN_NAME } from 'config/constants'
import { Text, Flex, Link, LinkExternal } from '@satoshicrypto/uikit'

const chainId = process.env.REACT_APP_CHAIN_ID

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpTokenPriceFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  isTokenOnly: boolean
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`
const StyledTitle = styled(Text)`
  color: #a9a9ff;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  removed,
  totalValueFormated,
  lpTokenPriceFormated,
  lpLabel,
  addLiquidityUrl,
  isTokenOnly,
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Flex justifyContent="space-between" alignItems="center" height="32px">
        <StyledTitle>{TranslateString(316, 'Stake')}:</StyledTitle>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" height="32px">
        <StyledTitle>{TranslateString(23, 'Total Liquidity')}:</StyledTitle>
        <Text>{totalValueFormated}</Text>
      </Flex>
      {!isTokenOnly && (
        <Flex justifyContent="space-between" alignItems="center" height="32px">
          <StyledTitle>{TranslateString(999, 'LP price')}:</StyledTitle>
          <Text>{lpTokenPriceFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, `${SCAN_NAME[chainId]}`)}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
