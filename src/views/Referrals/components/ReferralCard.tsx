import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, MetamaskIcon, LinkExternal, Text } from '@satoshicrypto/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import {decode as base64Decode, encode as base64Encode} from 'base-64';
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { BASE_URL } from '../../../config'
import registerToken from '../../../utils/metamaskUtils'

const StyledReferralCard = styled(Card)`
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
`

const ReferralCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const cryptedAccount = base64Encode(account)

  return (
    <StyledReferralCard>
      <CardBody>
        <Actions>
          { !account && (
            <div>
              <UnlockButton width="200px" /> 
              <DescriptionText fontSize="16px" color="textSubtle">Connect wallet to get your unique referral link</DescriptionText>
            </div>
          )
          }
          { account && (
            <div>
              <HeaderText fontSize="24px">Your Referral Link</HeaderText>
              <hr style={{border: '1px solid #6565bb'}}/>
              <DescriptionText fontSize="14px" color="textSubtle">{`${BASE_URL}/#/?ref=${cryptedAccount}`}</DescriptionText>
            </div>

          ) }
        </Actions>
      </CardBody>
    </StyledReferralCard>
  )
}

export default ReferralCard
