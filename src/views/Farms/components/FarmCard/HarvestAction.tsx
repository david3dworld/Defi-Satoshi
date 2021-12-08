import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { useFarmFromPid } from 'state/hooks'
import useTransferInfo from 'hooks/useTransferInfo'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  depositFeeBP?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 10px;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const farm = useFarmFromPid(pid)

  const rawEarningsBalance = getBalanceNumber(earnings, 'SAT');
  const displayBalance = rawEarningsBalance.toLocaleString();

  const calcCantHarvest = (weekLockStartTime) => {
    const currentTime = Math.floor(Date.now()/1000);
    const passWeeks = Math.floor((currentTime - weekLockStartTime) / (3600 * 24 * 7));
    if(passWeeks < 0) return true;

    const currentTimeFromFirstDay = currentTime - weekLockStartTime - passWeeks * (3600 * 24 * 7);
    if( currentTimeFromFirstDay > 3600 * 24 ) return true;
    if( farm.userData?.earnings.toNumber() <= 0) return true;
    return false;
  }

  const {weekLockStartTime} = useTransferInfo();
  const cantHarvest = calcCantHarvest(weekLockStartTime);

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <BalanceAndCompound>
        {pid === 0 ? (
          <Button
            disabled={cantHarvest || rawEarningsBalance === 0 || pendingTx}
            marginBottom="15px"
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
          >
            {TranslateString(704, 'Compound')}
          </Button>
        ) : null}
        <Button
          disabled={cantHarvest || rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {TranslateString(562, 'Harvest')}
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
