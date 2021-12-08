import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getCakeContract, getMasterchefContract } from 'utils/contractHelpers'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface Referrals extends FarmConfig {
  referrals: number
}
export interface ReferralCommissions extends FarmConfig {
  referralCommissions: BigNumber
}

const chainId = process.env.REACT_APP_CHAIN_ID

const useTransferInfo = () => {
  const [maxTransferAmount, setMaxTransferAmount] = useState<BigNumber>()
  const [transferTaxRate, setTransferTaxRate] = useState<BigNumber>()
  const [weekLockStartTime, setWeekLockStartTime] = useState<number>()
  const [totalLockedUpRewards, setTotalLockedUpRewards] = useState<BigNumber>()
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  
  useEffect(() => {
    const fetchTransferInfo = async () => {
      const maxAmount = await getCakeContract().methods.maxTransferAmount().call()
      const taxRate = await getCakeContract().methods.transferTaxRate().call()
      const totalLocked = await getMasterchefContract().methods.totalLockedUpRewards().call()
      const startTime = await getMasterchefContract().methods.weekLockStartTime().call()
console.log('-- maxAmount : ', maxAmount)
      setMaxTransferAmount(maxAmount)
      setTransferTaxRate(taxRate)
      setTotalLockedUpRewards(totalLocked)
      setWeekLockStartTime(startTime)
    }

    if (account) {
      fetchTransferInfo()
    }
  }, [account, fastRefresh])
  
  return {maxTransferAmount, transferTaxRate, totalLockedUpRewards, weekLockStartTime}
}

export default useTransferInfo
