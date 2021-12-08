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
import { useFarms, usePriceSatoshiBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border: 0px solid #c962d4;
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

const RowHighlighted = styled(Row)`
  background-color: ${({ theme }) => (theme.isDark ? '#36343c' : '#fbfbfb')};
  padding: 10px 5px;
  border-radius: 5px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const {maxTransferAmount, transferTaxRate, totalLockedUpRewards} = useTransferInfo()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const satoshiPrice = usePriceSatoshiBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply, 'SAT')
  const marketCap = satoshiPrice.times(circSupply)

  let satoshiPerBlock = 0
  if (farms && farms[0] && farms[0].satoshiPerBlock) {
    satoshiPerBlock = new BigNumber(farms[0].satoshiPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  const totalLockedUpRewardsDisp = new BigNumber(totalLockedUpRewards).div(new BigNumber(10).pow(18)).toNumber();
  const maxTransferAmountDisp = new BigNumber(maxTransferAmount).div(new BigNumber(10).pow(18)).toNumber();
  const transferTaxRateDisp = new BigNumber(transferTaxRate).div(new BigNumber(10).pow(2)).toNumber();

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(534, 'Satoshi Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap, 'SAT')} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply, 'SAT')} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}{' '}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance, 'SAT')} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(20004, 'Total Locked Rewards')}{' '}</Text>
          {!Number.isNaN(totalLockedUpRewardsDisp) && totalLockedUpRewardsDisp && <CardValue fontSize="14px" value={totalLockedUpRewardsDisp} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}{' '}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">
            {TranslateString(20005, 'Max Tx Amount')}{' '}
          </Text>
          {!Number.isNaN(maxTransferAmountDisp) && maxTransferAmountDisp && <CardValue fontSize="14px" value={maxTransferAmountDisp} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New SAT/block')}</Text>
          <Text bold fontSize="14px">
            {satoshiPerBlock}
          </Text>
        </Row>
        <Row>
          <Text fontSize="14px">
            {TranslateString(20006, 'Transfer Tax')}{' '}
          </Text>
          {!Number.isNaN(transferTaxRateDisp) && transferTaxRateDisp && <CardValue fontSize="14px" value={transferTaxRateDisp} decimals={1} suffix="%"/>}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
