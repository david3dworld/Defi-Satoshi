import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, MetamaskIcon, LinkExternal, Text } from '@satoshicrypto/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import {decode as base64Decode, encode as base64Encode} from 'base-64';
import { useAllHarvest } from 'hooks/useHarvest'
import useReferrals from 'hooks/useReferrals'
import UnlockButton from 'components/UnlockButton'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { BASE_URL } from '../../../config'
import registerToken from '../../../utils/metamaskUtils'

const StyledTotalReferralCommissionsCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 100px;
  border: 0px solid #c962d4;
  border-radius: 20px;
`

const Block = styled.div`
  margin-bottom: 0px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  text-align: center;
`

const TertiaryButton = styled(Button)`
  margin: 5px 0;
`

const HeaderText = styled(Text)`
  margin: 0;
`

const DescriptionText = styled(Text)`
  margin: 20px 0 0;
  text-align: left;
`

const TotalReferralCommissionsCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const { referralCommissions } = useReferrals()

  if( !account ) return <></>
  return (
    <StyledTotalReferralCommissionsCard>
      <CardBody>
        <Actions>
          <div>
            <HeaderText fontSize="20px">Total Referral Commissions</HeaderText>
            <hr style={{border: '1px solid #6565bb'}}/>
            <DescriptionText fontSize="14px" color="textSubtle">{`${getBalanceNumber(referralCommissions, 'SAT')}`}</DescriptionText>
          </div>
        </Actions>
      </CardBody>
    </StyledTotalReferralCommissionsCard>
  )
}

export default TotalReferralCommissionsCard
