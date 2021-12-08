/* eslint-disable */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Text, Flex, Heading } from '@satoshicrypto/uikit'
import { useWeb3React } from '@web3-react/core'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import useI18n from 'hooks/useI18n'
import { useLottery } from 'hooks/useContract'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import Divider from './components/Divider'
import LotteryProgress from './components/LotteryProgress'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import { lotteryHistory } from './utils/lotteryHistory'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
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

const StyledHeaderWrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
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
  width: 250px;
  margin-bottom: 30px;
`

const StyledProgress = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40%;
  }
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)

  useEffect(() => {
    lotteryHistory()
      .then((data) => {
        // @ts-ignore
        setHistoryData(data);
      })
      .catch(() => {
        setHistoryError(true)
      })
  }, [])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (account && lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [account, lotteryContract])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      
      <Page>
        <StyledSection>
          <StyledPage style={{minHeight: 'unset'}}>
            <StyledHeaderWrapper>
              <StyledHeader>
                <PageTopImage src="/images/page-top-lottery.png"/>
                <StyledHeadingM as="h1" size="xl" color="secondary" mb="10px" style={{textAlign: 'center'}}>
                  <span style={{color: '#32ffe4'}}>
                  {TranslateString(708, 'The SAT Lottery')}
                  </span>
                </StyledHeadingM>
                <StyledHeadingText style={{textAlign: 'center'}}>
                  {TranslateString(710, 'Buy tickets with SAT')}<br/>
                  {TranslateString(712, 'Win if 2, 3, or 4 of your ticket numbers match!')}
                </StyledHeadingText>                
                
              </StyledHeader>
              <StyledProgress>
                <LotteryProgress />
              </StyledProgress>
            </StyledHeaderWrapper>          
          </StyledPage>
        </StyledSection>
        <Wrapper>
          <ButtonMenu activeIndex={activeIndex} onItemClick={handleClick} scale="sm">
            <ButtonMenuItem>{TranslateString(716, 'Next draw')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(718, 'Past draws')}</ButtonMenuItem>
          </ButtonMenu>
        </Wrapper>
        <PastLotteryDataContext.Provider
          value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
        >
          {activeIndex === 0 ? <NextDrawPage /> : <PastDrawsPage />}
        </PastLotteryDataContext.Provider>
      </Page>
    </>
  )
}

export default Lottery
