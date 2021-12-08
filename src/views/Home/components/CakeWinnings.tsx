import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceSatoshiBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
 }
`
const CakeWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const cakeAmount = getBalanceNumber(claimAmount, 'SAT')
  const claimAmountBusd = new BigNumber(cakeAmount).multipliedBy(usePriceSatoshiBusd()).toNumber()

  return (
    <Block>
      <CardValue value={cakeAmount} fontSize="36px" lineHeight="52px"  />
      <CardBusdValue value={claimAmountBusd} decimals={2} />
    </Block>
  )
}

export default CakeWinnings
