import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider as ProviderType } from 'web3-core'
import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract } from 'utils/contractHelpers'
import { Button, Flex, Text } from '@satoshicrypto/uikit'
import { Farm } from 'state/types'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import useWeb3 from 'hooks/useWeb3'
import { useApprove } from 'hooks/useApprove'
import useTransferInfo from 'hooks/useTransferInfo'
import UnlockButton from 'components/UnlockButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import LockHarvestClockButton from './LockHarvestClockButton'


const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  provider?: ProviderType
  account?: string
  addLiquidityUrl?: string
  depositFeeBP?: number
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = getAddress(lpAddresses)
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const web3 = useWeb3()
  let lpContract

  if (isTokenOnly) {
    lpContract = getBep20Contract(tokenAddress, web3)
  } else {
    lpContract = getBep20Contract(lpAddress, web3)
  }

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        depositFeeBP={depositFeeBP}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button mt="15px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(564, 'Approve Contract')}
      </Button>
    )
  }

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
    <Action>
      <Flex justifyContent="space-between">
        <Flex style={{alignItems: 'flex-end'}}>
          <Text textTransform="uppercase" color="secondary" pr="7px">
            {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
            SAT
          </Text>
          <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
            {TranslateString(729, 'Earned')}
          </Text>
        </Flex>        
        {cantHarvest && <LockHarvestClockButton pid={pid}/>}
      </Flex>
      <HarvestAction earnings={earnings} pid={pid}/>
      <Flex style={{alignItems: 'flex-end'}}>
        <Text textTransform="uppercase" color="secondary" pr="7px">
          {lpName}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(730, 'Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="15px" width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
