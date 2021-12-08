import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getReferralAddress } from 'utils/addressHelpers'
import { getReferralContract } from 'utils/contractHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface Referrals extends FarmConfig {
  referrals: number
}
export interface ReferralCommissions extends FarmConfig {
  referralCommissions: BigNumber
}

const chainId = process.env.REACT_APP_CHAIN_ID

const useReferrals = () => {
  const [referrals, setReferrals] = useState<Referrals[]>([])
  const [referralCommissions, setReferralCommissions] = useState<BigNumber>()
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  
  useEffect(() => {
    const fetchReferrals = async () => {
      const referralsCount = await getReferralContract().methods.referralsCount(account).call()
      const totalReferralCommissions = await getReferralContract().methods.totalReferralCommissions(account).call()

      setReferrals(referralsCount)
      setReferralCommissions(totalReferralCommissions)
    }

    if (account) {
      fetchReferrals()
    }
  }, [account, fastRefresh])
  
  return {referrals, referralCommissions}
}

export default useReferrals
