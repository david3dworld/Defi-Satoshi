import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket, Image } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0px solid #c962d4;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const TicketRound = styled.div`
  text-align: center;
  width: 80px;
`

const UnlockWalletCard = () => {
  const TranslateString = useI18n()

  return (
    <Card isActive>
      <StyledCardBody>
        <IconWrapper>
          {/* <Ticket /> */}
          <TicketRound>
            <Image src="/images/satoshicrypto-lottery-ticket.png" alt="Number 1" width={130} height={130} responsive />
          </TicketRound>
        </IconWrapper>
        <StyledHeading size="md">{TranslateString(1080, 'Connect wallet to access lottery')}</StyledHeading>
        <UnlockButton />
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
