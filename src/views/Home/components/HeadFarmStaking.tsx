import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, MetamaskIcon, LinkExternal } from '@satoshicrypto/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { BASE_URL } from '../../../config'
import { contracts } from '../../../config/constants'
import registerToken from '../../../utils/metamaskUtils'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledFarmStakingCard = styled.div`
`

const Block = styled.div`
  margin-bottom: 0px;
  width: 80%
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  
  background-color: rgba(0,0,0,0.2);
  border-radius: 20px;
  margin-top: 40px;
  padding: 30px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const TertiaryButton = styled(Button)`
  margin: 5px 0;
`

const StyledSeperator = styled.div`
  width: 250px;
  height: 1px;
  border-right: unset;
  border-bottom: 1px solid #fff;
  margin: 30px 0 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    width: 1px;
    border-right: 1px solid #fff;
    border-bottom: unset;
    margin: unset;
  }
`

const StyledImage = styled.img`
  width: 80px;
  margin-bottom: 10px;
`

const Actions = styled.div`
  margin-top: 20px;
`

const HeadFarmStaking = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const tokenImageSrc = `${BASE_URL}/images/farms/sat.png`
  const tokenName = `SAT`
  const tokenAddress = contracts[chainId].cake[chainId]

  return (
    <StyledFarmStakingCard>
      <Container>
        <Block>
          <StyledImage src="/images/home-header-harvest.png" />
          <Label>{TranslateString(544, 'SAT to Harvest')}:</Label>
          <CakeHarvestBalance />
          <Actions>
            {account ? (
              <Button
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
              >
                {pendingTx
                  ? TranslateString(548, 'Collecting SAT')
                  : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
              </Button>
            ) : (
              <UnlockButton />
            )}
          </Actions>          
        </Block>
        <StyledSeperator />
        <Block>
          <StyledImage src="/images/home-header-wallet.png" />
          <Label>{TranslateString(546, 'SAT in Wallet')}:</Label>
          <CakeWalletBalance />
          <Actions>
            <Button
              variant="primary"
              onClick={() => registerToken(tokenAddress, tokenName, 18, tokenImageSrc)}
              startIcon={<MetamaskIcon />}
            >
              Add {tokenName} to Metamask
            </Button>
          </Actions>
          
        </Block>
      </Container>
    </StyledFarmStakingCard>
  )
}

export default HeadFarmStaking
