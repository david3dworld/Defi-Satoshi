import React from 'react'
import { Card, CardBody, Heading, LinkExternal, Text } from '@satoshicrypto/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useTransferInfo from 'hooks/useTransferInfo'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import CardValue from './CardValue'
import { useFarms, usePriceSatoshiBusd, useTotalValue } from '../../../state/hooks'

const StyledCakeStats = styled.div`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 0px solid #c962d4;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  min-width: 30%;
`

const RowHighlighted = styled(Row)`
  background-color: ${({ theme }) => (theme.isDark ? '#36343c' : '#fbfbfb')};
  padding: 10px 5px;
  border-radius: 5px;
`

const StyledTitle = styled(Text)`
  margin-bottom: 10px;
`

const StyledSeperator = styled.div`
  width: 250px;
  height: 1px;
  border-right: unset;
  border-bottom: 1px solid #fff;
  margin: 30px 0 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 70px;
    width: 1px;
    border-right: 1px solid #fff;
    border-bottom: unset;
    margin: unset;
  }
`

const HeadStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const {maxTransferAmount, transferTaxRate, totalLockedUpRewards} = useTransferInfo()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const satoshiPrice = usePriceSatoshiBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply, 'SAT')
  const marketCap = satoshiPrice.times(circSupply)
  const totalValue = useTotalValue()

  let satoshiPerBlock = 0
  if (farms && farms[0] && farms[0].satoshiPerBlock) {
    satoshiPerBlock = new BigNumber(farms[0].satoshiPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  const totalLockedUpRewardsDisp = new BigNumber(totalLockedUpRewards).div(new BigNumber(10).pow(18)).toNumber();
  const maxTransferAmountDisp = new BigNumber(maxTransferAmount).div(new BigNumber(10).pow(18)).toNumber();
  const transferTaxRateDisp = new BigNumber(transferTaxRate).div(new BigNumber(10).pow(2)).toNumber();

  return (
    <StyledCakeStats>
      <Container>
        <Row>
          <StyledTitle fontSize="20px">{TranslateString(731, 'Total Value Locked (TVL)')}</StyledTitle>
          <CardValue fontSize="42px" value={totalValue.toNumber()} prefix="$" decimals={2} />
        </Row>
        <StyledSeperator />
        <Row>
          <StyledTitle fontSize="20px">{TranslateString(10005, 'Market Cap')}</StyledTitle>
          <CardValue fontSize="42px" value={getBalanceNumber(marketCap, 'SAT')} decimals={0} prefix="$" />
        </Row>
        <StyledSeperator />
        <Row>
          <StyledTitle fontSize="20px">{TranslateString(10004, 'Circulating Supply')}{' '}</StyledTitle>
          {cakeSupply && <CardValue fontSize="42px" value={cakeSupply} decimals={0} />}
        </Row>
      </Container>
      
    </StyledCakeStats>
  )
}

export default HeadStats
