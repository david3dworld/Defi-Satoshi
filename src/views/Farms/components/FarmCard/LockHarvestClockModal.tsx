import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@satoshicrypto/uikit'
import Countdown from 'react-countdown'
import { useFarmFromPid } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import useTransferInfo from 'hooks/useTransferInfo'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  pid: number
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 20px;
`

const GridItem = styled.div`
  margin-bottom: '5px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const LockHarvestClockModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  pid
}) => {
  const TranslateString = useI18n()
  const farm = useFarmFromPid(pid)

  const {weekLockStartTime} = useTransferInfo();
  const currentTime = Math.floor(Date.now()/1000);
  let nextHarvestUntil = weekLockStartTime;
  if( currentTime < weekLockStartTime ) {
    nextHarvestUntil = weekLockStartTime*1000
  } else {
    console.log('-- currentTime : ', currentTime);
    console.log('-- weekLockStartTime : ', weekLockStartTime);
    const passWeeks = Math.floor((currentTime - weekLockStartTime) / (3600 * 24 * 7));
    console.log('-- passWeeks : ', passWeeks);
    nextHarvestUntil = (weekLockStartTime/1 + (passWeeks+1) * (3600 * 24 * 7)) * 1000;  
    // console.log('-- nextHarvestUntil : ', nextHarvestUntil, weekLockStartTime);
  }
  console.log('-- nextHarvestUntil : ', nextHarvestUntil, weekLockStartTime, currentTime)

  return (
    <Modal title="Harvest In" onDismiss={onDismiss}>
      <Grid>
      {!Number.isNaN(nextHarvestUntil) && <GridItem>
          <Text fontSize="40px" bold color="textSubtle" textTransform="uppercase" mb="10px" textAlign="center">
            <Countdown date={nextHarvestUntil} /> 
          </Text>
        </GridItem>}
        <GridItem>
          <Text fontSize="20px" color="input" textAlign="center">
            Farm: {farm.lpSymbol}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="20px" color="input" textAlign="center">
            Harvest Lockup: 6days
          </Text>
        </GridItem>
      </Grid>
    </Modal>
  )
}

export default LockHarvestClockModal
