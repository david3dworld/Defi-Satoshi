import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import history from 'routerHistory'
import { Heading, Text, BaseLayout, Button, HelpIcon, Flex } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import {decode as base64Decode, encode as base64Encode} from 'base-64';
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import HeadStats from 'views/Home/components/HeadStats'
import HeadStatsOther from 'views/Home/components/HeadStatsOther'
import HeadFarmStaking from 'views/Home/components/HeadFarmStaking'
import HeadLottery from 'views/Home/components/HeadLottery'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import ListedOn from 'views/Home/components/ListedOn'
import UnlockButton from 'components/UnlockButton'
import AuditCard from './components/AuditCard'
import LPWorth from './components/LPWorth'
import DexStats from './components/DexStats'
import useParsedQueryString from '../../hooks/useParsedQueryString'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 22px;
  padding-top: 60px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const VerticalCards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;

  & > div {
    grid-column: span 12;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const StyledSectionMain = styled.div`
  text-align: center;

  padding-top: 100px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledSection = styled.div`
  text-align: center;

  padding-top: 100px;
  padding-bottom: 100px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const HeaderImageContainer = styled.div`
  width: 80%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 43%;
  }
`
const HeaderImage = styled.img`
  
`

const StyledPage = styled(Page)`
  min-height: unset;
`

const StyledHeaderMain = styled.div`
  width: 100%;
  padding-top: 20px;
  min-height: 600px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 55%;
  }
`

const StyledHeader = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 55%;
  }
`

const StyledHeadingL = styled(Heading)`
  font-family: Julee;
  font-size: 46px;
  text-align: left;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 76px;
  }
`

const StyledHeadingM = styled(Heading)`
  font-family: Julee;
  font-size: 36px;
  text-align: left;
  color: #fff;

  & > span {
    font-family: Julee;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 48px;
  }
`

const StyledHeadingS = styled(Heading)`
  font-family: Julee;
  font-size: 28px;
  text-align: left;
  color: #fff;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 32px;
  }
`

const StyledHeadingText = styled(Text)`
  font-size: 18px;
  text-align: left;
  color: #a9a9ff;
  margin-top: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    
  }
`

const StyledHeaderActions = styled.div`
  margin-top: 70px;
  text-align: left;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const parsedQs = useParsedQueryString();

  if( parsedQs.ref ) {
    // @ts-ignore
    const accountRef = base64Decode(parsedQs.ref)
    localStorage.setItem("SATOSHI_REF", accountRef)
  }

  return (
    <>  
      <StyledSectionMain style={{backgroundImage: 'url(\'/images/home-header-bg.jpg\')'}}>
        <Page>
          <StyledHeaderMain>
            <StyledHeadingL as="h1" size="xl" color="secondary" mb="24px">
              SatoshiCrypto
            </StyledHeadingL>
            <StyledHeadingS as="h1" size="xl" color="secondary" mb="24px">
              One Stop Shop + Defi Yield Farming on <br/>Binance Smart Chain
            </StyledHeadingS>
            <HeadFarmStaking />
          </StyledHeaderMain>
          <HeadStats />
        </Page>
      </StyledSectionMain>  
      <StyledSection>
        <StyledPage style={{minHeight: 'unset'}}>
          <Flex>
            <HeaderImageContainer>
              <HeaderImage src="/images/home-header-trade.png"/>
            </HeaderImageContainer>            
            <StyledHeader>
              <StyledHeadingM as="h1" size="xl" color="secondary" mb="24px">
                <span style={{color: '#32ffe4'}}>Trade </span>
                <span style={{color: '#fff'}}>anything. No registration, no hassle.</span>
              </StyledHeadingM>
              <StyledHeadingText>
                Trade any token on Binance Smart Chain in seconds, just by connecting your wallet.
              </StyledHeadingText>
              <StyledHeaderActions>
                <Button as="a" href="https://swap.satoshicrypto.finance">
                  Trade Now
                </Button>
              </StyledHeaderActions>
            </StyledHeader>
          </Flex>          
        </StyledPage>
      </StyledSection>
      <StyledSection style={{backgroundColor: 'rgba(250,0,52,0.3)'}}>
        <StyledPage style={{minHeight: 'unset'}}>
          <Flex>
            <StyledHeader>
              <StyledHeadingM as="h1" size="xl" color="secondary" mb="24px">
                <span style={{color: '#32ffe4'}}>Earn </span> 
                <span style={{color: '#fff'}}>passive income with crypto.</span>
              </StyledHeadingM>
              <StyledHeadingText>
                SatoshiCrypto makes it easy to make your crypto work for you.
              </StyledHeadingText>
              <StyledHeaderActions>
                <Button
                  onClick={()=>{history.push('/farms')}}
                >
                  Explorer
                </Button>
              </StyledHeaderActions>
            </StyledHeader>
            <HeaderImageContainer>
              <HeaderImage src="/images/home-header-earn.png"/>
            </HeaderImageContainer>
          </Flex>          
        </StyledPage>
      </StyledSection>
      <StyledSection style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <StyledPage style={{minHeight: 'unset'}}>
          <Flex style={{flexDirection: 'column'}}>          
            <StyledHeader style={{width: '100%'}}>
              <StyledHeadingM as="h1" size="xl" color="secondary" mb="24px" style={{textAlign: 'center'}}>
                <span style={{color: '#32ffe4'}}>Win  </span>
                <span style={{color: '#fff'}}>millions in SAT lottery prizes.</span>
              </StyledHeadingM>
              <StyledHeadingText style={{textAlign: 'center'}}>
                Buy tickets with SAT, win SAT if your numbers match
              </StyledHeadingText>
            </StyledHeader>
            <HeadLottery />
          </Flex>          
        </StyledPage>
      </StyledSection>
      <StyledSection style={{backgroundImage: 'url(\'/images/home-header-stat.png\')'}}>
        <StyledPage style={{minHeight: 'unset'}}>
          <Flex>
            <StyledHeader>
              <StyledHeadingM as="h1" size="xl" color="secondary" mb="24px">
                <span style={{color: '#32ffe4'}}>SAT </span> 
                <span style={{color: '#fff'}}>makes our world go round.</span>
              </StyledHeadingM>
              <StyledHeadingText>
                SAT token is at the heart of the SatoshiCrypto ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!
              </StyledHeadingText>
              <StyledHeaderActions>
                <Button as="a" href="https://swap.satoshicrypto.finance?outputCurrency=0x4Ee80372D69260d72826f6e8F2351201618709Ae">
                  Buy SAT
                </Button>
              </StyledHeaderActions>
            </StyledHeader>
          </Flex>  
          <HeadStatsOther />        
        </StyledPage>
      </StyledSection>
    </>
  )
}

export default Home
