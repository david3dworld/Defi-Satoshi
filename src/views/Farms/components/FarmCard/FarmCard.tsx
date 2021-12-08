import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, Link } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL, BASE_EXCHANGE_URL, PCS_ADD_LIQUIDITY_URL, PCS_EXCHANGE_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import getSwapUrlPathParts from 'utils/getSwapUrlPathParts'
import getBscScanLink from 'utils/getBscScanLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import bscScanAddress from '../../../../utils/getBscScanLink'


const chainId = process.env.REACT_APP_CHAIN_ID

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  liquidity?: BigNumber
  lpTotalSupply?: BigNumber
  lpPrice?: BigNumber
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`
// background: linear-gradient(
//   180deg,
//   rgba(255, 0, 0, 1) 0%,
//   rgba(95, 21, 242, 1) 35%,
//   rgba(186, 12, 248, 1) 70%,
//   rgba(251, 7, 217, 1) 100%
// );
const StyledCardAccent = styled.div`
  background: linear-gradient(
    0deg,
    rgba(255, 154, 0, 0.7) 10%,
    rgba(251, 7, 217, 0.7) 50%,
    rgba(255, 0, 0, 0.7) 100%
  );
  
  background-size: 100% 100%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 20px;
  filter: blur(5px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${({ theme }) => theme.colors.card};
  border: 0px solid #c962d4;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const Ribbon = styled.div`
  background-position: right top;
  background-repeat: no-repeat;
  height: 7em;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 6em;
  background-size: contain;
  z-index: 999;
`

const V2LpRibbon = styled(Ribbon)`
  background-image: url(/images/ribbon_ape.svg);
`

const PscLpRibbon = styled(Ribbon)`
  background-image: url(/images/ribbon_psc.svg);
`

const PscOldLpRibbon = styled(Ribbon)`
  background-image: url(/images/ribbon_old.svg);
`

const StyledTitle = styled(Text)`
  color: #a9a9ff;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  usdtPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, bnbPrice, cakePrice, usdtPrice, ethPrice, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

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
  }, [bnbPrice, cakePrice, usdtPrice, ethPrice, farm])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpPrice = useMemo(() => {
    if (farm.isTokenOnly) {
      return null
    }

    return Number(totalValue) / Number(farm.lpTokenBalanceMC)
  }, [farm, totalValue])

  const lpTokenPriceFormated = lpPrice
    ? `~$${Number(lpPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'SAT'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0, -1)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${farm.isPsc ? PCS_ADD_LIQUIDITY_URL : BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const swapeUrlPathParts = getSwapUrlPathParts({ tokenAddresses })
  const addTokenUrl = `${farm.isPsc ? PCS_EXCHANGE_URL : BASE_EXCHANGE_URL}/${swapeUrlPathParts}`
  const getUrl = farm.isTokenOnly ? addTokenUrl : addLiquidityUrl

  let lockTime = farm.harvestLockup?.toNumber()/3600;
  let isHour = true;
  if( lockTime < 1 ) {
    lockTime = farm.harvestLockup?.toNumber()/60
    isHour = false;
  }

  return (
    <FCard>
      {!farm.isTokenOnly && farm.isV2 && <V2LpRibbon />}
      {!farm.isTokenOnly && farm.isPsc && <PscLpRibbon />}
      {farm.tokenSymbol === 'SAT' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
        isTokenOnly={farm.isTokenOnly}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center" height="32px">
          <StyledTitle>{TranslateString(736, 'APR')}:</StyledTitle>
          <Text style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                <ApyButton lpLabel={lpLabel} addLiquidityUrl={getUrl} cakePrice={cakePrice} apy={farm.apy} />
                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between" alignItems="center" height="32px">
        <StyledTitle>{TranslateString(318, 'Earn')}:</StyledTitle>
        <Text >{earnLabel}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" height="32px">
        <StyledTitle>{TranslateString(10001, 'Deposit Fee')}:</StyledTitle>
        <Text
          style={{
            backgroundColor: farm.depositFeeBP === 0 ? '#4bca4b' : 'transparent',
            color: farm.depositFeeBP === 0 ? 'white' : '#424f3e',
            padding: farm.depositFeeBP === 0 ? '2px 10px' : 'inherit',
            borderRadius: farm.depositFeeBP === 0 ? '20px' : 'inherit',
            fontSize: farm.depositFeeBP === 0 ? 14 : 16
          }}
        >
          {farm.depositFeeBP / 100}%
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" height="32px">
        <StyledTitle>
          {TranslateString(20001, 'Harvest Lockup')}: 
          <span data-tip data-for="harvestLockupTooltip">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
          <ReactTooltip id="harvestLockupTooltip" effect="solid">
            <span>
              {TranslateString(2003, 'How soon can you harvest or compound again')}
            </span>
          </ReactTooltip>
        </StyledTitle>
        <Text>
          6 days
          <span data-tip data-for="harvestLockupTimeTooltip">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
          <ReactTooltip id="harvestLockupTimeTooltip" effect="solid">
            <span>
              {TranslateString(2003, 'You can\'t harvest in 6 days. only you can harvest on Monday')}
            </span>
          </ReactTooltip>
        </Text>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={getUrl} />
      {!farm.isTokenOnly && farm.isOldPsc && (
        <div>
          <Text color="secondary" fontSize="16px" mt="10px" style={{ textAlign: 'center' }}>
            💡 {TranslateString(10008, 'Legacy Pancakeswap')}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            <Link
              color="textDisabled"
              fontSize="14px"
              mt="10px"
              href="https://satoshicrypto.medium.com/partnership-with-apeswap-finance-c1dd2dd44eee"
              target="blank"
              rel="noopener noreferrer"
            >
              {TranslateString(
                10009,
                'You have to move your liquidity pairs (LP) from Pancakeswap to Apeswap, click here to learn more.',
              )}
            </Link>
          </Text>
        </div>
      )}
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={getBscScanLink(parseInt(chainId), farm.isTokenOnly? farm.tokenAddresses[chainId] : farm.lpAddresses[chainId], 'address')}
          totalValueFormated={totalValueFormated}
          lpTokenPriceFormated={lpTokenPriceFormated}
          lpLabel={lpLabel}
          addLiquidityUrl={getUrl}
          isTokenOnly={farm.isTokenOnly}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
