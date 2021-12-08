import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from '@satoshicrypto/uikit'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import { useTotalClaim } from 'hooks/useTickets'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useApproval } from 'hooks/useApproval'
import PurchaseWarningModal from 'views/Lottery/components/TicketCard/PurchaseWarningModal'
import CakeWinnings from './CakeWinnings'
import LotteryJackpot from './LotteryJackpot'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledHeadLottery = styled.div`
  width: 70%;
  margin: 0 auto;
`

const Block = styled.div`
  margin-bottom: 0px;
  width: 80%
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  
  background-color: rgba(0,0,0,0.2);
  border-radius: 20px;
  margin-top: 40px;
  padding: 30px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const TertiaryButton = styled(Button)`
  margin: 5px 0;
`

const StyledSeperator = styled.div`
  width: 250px;
  height: 1px;
  border-right: unset;
  border-bottom: 1px solid #fff;
  margin: 30px 0 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    width: 1px;
    border-right: 1px solid #fff;
    border-bottom: unset;
    margin: unset;
  }
`

const StyledImage = styled.img`
  width: 150px;
  margin-bottom: 30px;  
`

const Actions = styled.div`
  margin-top: 20px;
`

const HeadLottery = () => {
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const [requesteClaim, setRequestedClaim] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const { claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const { handleApprove, requestedApproval } = useApproval(onPresentApprove)

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const renderLotteryTicketButtonBuyOrApprove = () => {
    if (!allowance.toNumber()) {
      return (
        <Button disabled={requestedApproval} onClick={handleApprove}>
          {TranslateString(494, 'Approve CAKE')}
        </Button>
      )
    }
    return (
      <Button id="dashboard-buy-tickets" variant="secondary" onClick={onPresentBuy} disabled={lotteryHasDrawn}>
        {TranslateString(558, 'Buy Tickets')}
      </Button>
    )
  }

  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="CAKE" />)

  return (
    <StyledHeadLottery>
      <Container>
        <Block>
          <StyledImage src="/images/home-header-lottery-collect.png" />
          <Label>{TranslateString(552, 'SAT to Collect')}:</Label>
          <CakeWinnings />
          <Actions>
            <Button
              id="dashboard-collect-winnings"
              disabled={getBalanceNumber(claimAmount, 'SAT') === 0 || requesteClaim}
              onClick={handleClaim}
              style={{ marginRight: '8px' }}
            >
              {TranslateString(556, 'Collect Winnings')}
            </Button>
          </Actions>          
        </Block>
        <StyledSeperator />
        <Block>
          <StyledImage src="/images/home-header-lottery-jackpot.png" />
          <Label>{TranslateString(554, 'Total jackpot this round')}:</Label>
          <LotteryJackpot />
          <Actions>
            {renderLotteryTicketButtonBuyOrApprove()}
          </Actions>
          
        </Block>
      </Container>
    </StyledHeadLottery>
  )
}

export default HeadLottery
