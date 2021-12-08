import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import UnlockButton from 'components/UnlockButton'
import { useWeb3React } from '@web3-react/core'
import { 
  useFarmFromPid, 
  useFarmUser, 
  usePriceBnbBusd, 
  usePriceSatoshiBusd, 
  usePriceEthBusd,
  usePriceUsdtBusd,
} from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
import { useApprove } from 'hooks/useApprove'
import { getBep20Contract } from 'utils/contractHelpers'
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL, PCS_ADD_LIQUIDITY_URL, PCS_EXCHANGE_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import useWeb3 from 'hooks/useWeb3'
import BigNumber from 'bignumber.js'

import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned, Title, Subtle, Staked as StakedTag } from './styles'
import { QuoteToken } from '../../../../../config/constants/types'
import getSwapUrlPathParts from '../../../../../utils/getSwapUrlPathParts'

const chainId = process.env.REACT_APP_CHAIN_ID

const IconButtonWrapper = styled.div`
  display: flex;
`

const Staked: React.FunctionComponent<FarmWithStakedValue> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
}) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const farm = useFarmFromPid(pid)
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const web3 = useWeb3()
  const cakePrice = usePriceSatoshiBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const usdtPrice = usePriceUsdtBusd()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }

    let quoteTokenBNB = QuoteToken.BNB
    if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) quoteTokenBNB = QuoteToken.FTM
    if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) quoteTokenBNB = QuoteToken.ONE

    if (farm.quoteTokenSymbol === quoteTokenBNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }    
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.USDT) {
      return usdtPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, usdtPrice, ethPrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const lpPrice = useMemo(() => {
    if (farm.isTokenOnly) {
      return null
    }

    return Number(totalValue) / Number(farm.lpTokenBalanceMC)
  }, [farm, totalValue])

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  const addLiquidityUrl = `${farm.isPsc ? PCS_ADD_LIQUIDITY_URL : BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const swapeUrlPathParts = getSwapUrlPathParts({ tokenAddresses })
  const addTokenUrl = `${farm.isPsc ? PCS_EXCHANGE_URL : BASE_EXCHANGE_URL}/${swapeUrlPathParts}`
  const getUrl = farm.isTokenOnly ? addTokenUrl : addLiquidityUrl
  const rawStakedBalance = getBalanceNumber(stakedBalance, farm.lpSymbol)
  const displayBalance = rawStakedBalance.toLocaleString()
  const displayBalanceUsd = (lpPrice * rawStakedBalance).toLocaleString()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={lpSymbol}
      addLiquidityUrl={getUrl}
      depositFeeBP={farm.depositFeeBP}
    />,
  )
  const [onPresentWithdraw] = useModal(<WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={lpSymbol} />)

  let lpContract

  if (farm.isTokenOnly) {
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

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle>{TranslateString(737, 'START FARMING')}</Subtle>
        </ActionTitles>
        <ActionContent>
          <UnlockButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (rawStakedBalance) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Title>{lpSymbol} </Title>
            <Subtle>{TranslateString(738, 'STAKED')}</Subtle>
          </ActionTitles>
          <ActionContent>
            <div>
              <Earned>{displayBalance}</Earned>
              {!farm.isTokenOnly && <StakedTag>≈{displayBalanceUsd} USD</StakedTag>}
            </div>
            <IconButtonWrapper>
              <IconButton variant="secondary" onClick={onPresentWithdraw} mr="6px">
                <MinusIcon color="primary" />
              </IconButton>
              <IconButton variant="secondary" onClick={onPresentDeposit}>
                <AddIcon color="primary" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle>{TranslateString(735, 'STAKE')} </Subtle>
          <Title>{lpSymbol}</Title>
        </ActionTitles>
        <ActionContent>
          <Button width="100%" onClick={onPresentDeposit} variant="secondary">
            {TranslateString(736, 'Stake')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Subtle>{TranslateString(741, 'ENABLE')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" disabled={requestedApproval} onClick={handleApprove} variant="secondary">
          {TranslateString(741, 'Enable')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
