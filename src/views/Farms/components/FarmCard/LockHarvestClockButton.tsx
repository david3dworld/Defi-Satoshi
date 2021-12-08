import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon, ClockIcon } from '@satoshicrypto/uikit'
import LockHarvestClockModal from './LockHarvestClockModal'

export interface ClockButtonProps {
  pid: number
}

const LockHarvestClockButton: React.FC<ClockButtonProps> = ({ pid }) => {
  const [onPresentApyModal] = useModal(
    <LockHarvestClockModal pid={pid}/>,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <ClockIcon />
    </IconButton>
  )
}

export default LockHarvestClockButton
