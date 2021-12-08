import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Button, HelpIcon, Flex } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import ReferralCard from './components/ReferralCard'
import TotalReferralsCard from './components/TotalReferralsCard'
import TotalReferralCommissionsCard from './components/TotalReferralCommissionsCard'

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

const Header = styled.div`
  padding: 32px 0px;
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const TokenImage = styled.img`
  margin-left: 5px;
  margin-right: 5px;
`

const StyledSection = styled.div`
  text-align: center;

  padding-top: 100px;
  padding-bottom: 30px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledPage = styled(Page)`
  min-height: unset;
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

  ${({ theme }) => theme.mediaQueries.sm} {
    
  }
`

const PageTopImage = styled.img`
  width: 200px;
  margin-bottom: 30px;
`

const Referrals: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>      
      <Page>
        <StyledSection>
          <StyledPage style={{minHeight: 'unset'}}>
            <Flex style={{flexDirection: 'column'}}>          
              <StyledHeader style={{width: '100%'}}>
                <PageTopImage src="/images/page-top-referral.png"/>
                <StyledHeadingM as="h1" size="xl" color="secondary" mb="10px" style={{textAlign: 'center'}}>
                  <span style={{color: '#32ffe4'}}>
                    {TranslateString(579, 'Satoshi Referral Program')}
                  </span>
                </StyledHeadingM>
                <StyledHeadingText style={{textAlign: 'center'}}>
                  Share the referral link below to invite your friends and earn 1% of your friends&apos; earnings FOREVER!
                </StyledHeadingText>                
              </StyledHeader>
            </Flex>          
          </StyledPage>
        </StyledSection>
        <Cards>
          <TotalReferralsCard />
          <TotalReferralCommissionsCard />
        </Cards>
        <div>
          <ReferralCard />
        </div>
      </Page>
    </>
  )
}

export default Referrals
