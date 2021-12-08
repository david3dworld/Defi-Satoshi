import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'
import registerToken from 'utils/metamaskUtils'
import { Flex, MetamaskIcon, Text } from '@satoshicrypto/uikit'
import { BASE_URL } from 'config'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  projectLink: string
  decimals: number
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
  tokenName: string
  tokenAddress: string
  tokenDecimals: number
  isLp: boolean
  totalValueFormated?: string
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string
}

const StyledText = styled(Text)<TextProps>`
  color: ${({ isDisabled, color, theme }) => (isDisabled ? theme.colors.textDisabled : color)};
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  decimals,
  tokenAddress,
  totalStaked,
  tokenName,
  tokenDecimals,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
  isLp,
  totalValueFormated,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  const imageSrc = `${BASE_URL}/images/farms/${tokenName.toLowerCase()}.png`

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')} <Icon />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details>
          <Flex justifyContent="space-between">
            <Text>
              {tokenName === 'SAT' && (
                <span>
                  <img src="/images/farms/sat.png" alt="SAT Token" width="15" height="15" />{' '}
                </span>
              )}
              {TranslateString(10011, 'Total staked')}
            </Text>
            <Text>
              <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked, tokenName)} />
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
            <StyledText bold fontSize="14px">
              {totalValueFormated}
            </StyledText>
          </Flex>
          {blocksUntilStart === 0 && blocksRemaining > 0 && (
            <Flex justifyContent="space-between">
              <Text>{TranslateString(999, 'Blocks remaining')}:</Text>
              <Text>
                <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
              </Text>
            </Flex>
          )}
          {!isLp && (
            <Row>
              <TokenLink onClick={() => registerToken(tokenAddress, tokenName, tokenDecimals, imageSrc)}>
                Add {tokenName} to Metamask
              </TokenLink>
              <MetamaskIcon height={15} width={15} ml="4px" />
            </Row>
          )}
          <Row>
            <TokenLink href={projectLink} target="_blank">
              {TranslateString(412, 'View project site')}
            </TokenLink>
          </Row>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
