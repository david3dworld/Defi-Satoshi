import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Button, HelpIcon, Radio, Flex } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import { RouteComponentProps } from 'react-router-dom'
import useTokenInfo from 'hooks/useTokenInfo'
import { usePriceBnbBusd } from 'state/hooks'
import TradingViewWidget from './components/TradingView'
import TradingTable from './components/TradingTable'
import SearchInput from '../Farms/components/SearchInput'
import SearchToken from './components/SearchToken'
import AdbutlerContainer from './components/AdbutlerContainer'
import RadioGroup from './components/RadioGroup'


const Header = styled.div`
  padding: 0;

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 24px;
  }
`

const AdsBox = styled.div`
  margin: 0 auto;
`

const Page = styled.div`
  padding: 20px 0;
  display: block;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    max-width: 1600px;
    margin: 0 auto;
  }
`

const TradingViewWrap = styled.div`
  width: 100%;
  height: 360px;
  position: relative;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 580px;
  }
`

const TradingTableWrap = styled.div`
  width: 100%;
  max-height: 700px;
  overflow: auto;
`

const SideBanner = styled.div`
  width: 100%;
  padding: 0 15px 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 330px;
  }
`

const TradingSection = styled.div`
  flex: 1;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
`

const ChartOverlay = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  opacity: 0.25;
  pointer-events: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 400px;
    height: 400px;
  }
`

const TableWrapper = styled.div`
  min-width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
`

const StyledSection = styled.div`
  text-align: center;

  padding-top: 120px;
  padding-bottom: 0;
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

const Chart = (props: RouteComponentProps<{token: string}>) => {
  const { isDark, toggleTheme } = useTheme()

  // const udfHost = 'http://localhost:8004'
  const udfHost = 'https://chartapi.satoshicrypto.finance'

  const [tokenPrice, setTokenPrice] = useState(0)

  const {
    match: {
      params: { token },
    },
  } = props

  const bnbPrice = usePriceBnbBusd().toNumber()
  const info = useTokenInfo(token)

  const lpTypes = [
    {
      value: 'all',
      name: 'All'
    },
    {
      value: 'satoshi',
      name: 'Satoshi'
    },
    {
      value: 'pcv2',
      name: 'Pcv2'
    }
  ];

  const [lpType, setLpType] = useState('satoshi');

  return (
    <>
      <StyledSection>
          <StyledPage style={{minHeight: 'unset'}}>
            <StyledHeader style={{width: '100%'}}>
              {/* <PageTopImage src="/images/page-top-launchpad.png"/> */}
              <StyledHeadingM as="h1" size="xl" color="secondary" mb="10px" style={{textAlign: 'center'}}>
                <span style={{color: '#32ffe4'}}>
                  Satoshi Chart
                </span>
              </StyledHeadingM>
            </StyledHeader>         
          </StyledPage>
        </StyledSection>
      <Header className="hide-mobile" >
        {/* {ads[0] && <AdbutlerContainer width={970} height={90} ID="181998" setID={ads[0]} />} */}
        {/* <iframe title="header banner" data-aa="1709438" src="//ad.a-ads.com/1709438?size=728x90" scrolling="no" style={{width:'728px', height:'90px',border:'0px',padding:0,overflow:'hidden',margin:'0 auto',display:'block'}} /> */}
      </Header>
      <Page>
        <SideBanner>
          <SearchToken token={info} bnbPrice={bnbPrice} udfHost={ udfHost } />
          <div style={{marginTop: '20px'}} />
          {/* {ads[3] && <AdbutlerContainer className="hide-mobile" width={300} height={250} ID="181998" setID={ads[3]} />} */}
          <div style={{marginTop: '20px'}} />
          {/* {ads[4] && <AdbutlerContainer className="hide-mobile" width={300} height={250} ID="181998" setID={ads[4]} />} */}
        </SideBanner>
        
        <div style={{margin: '20px auto 0'}} className="hide-desktop" >
          {/* {ads[1] && <AdbutlerContainer className="hide-desktop" width='100%' height='auto' ID="181998" setID={ads[1]} />} */}
        </div>
        <TradingSection>
          <div>
            <RadioGroup fields={lpTypes} value='all' onChange={setLpType} style={{textAlign:'center',marginBottom:10}} />
          </div>
          <TradingViewWrap>
            {/* @ts-ignore */}
            {bnbPrice > 0 && info.address && <TradingViewWidget
              theme={ isDark? 'Dark' : 'Light' }
              udfHost={ udfHost }
              autosize
              token={info}
              bnbPrice={bnbPrice}
              setTokenPrice={price=>setTokenPrice(price)}
              lpType={lpType}
              // symbol={info.symbol}
            />}
          </TradingViewWrap>
          <div style={{margin: '20px auto 0'}}>
            {/* {ads[2] && <AdbutlerContainer className="hide-desktop" width='100%' height='auto' ID="181998" setID={ads[2]} />} */}
          </div>
          <TradingTableWrap>
            <TableWrapper>
              <TradingTable
                udfHost={ udfHost }
                token={info}
                bnbPrice={bnbPrice}
              />
            </TableWrapper>
          </TradingTableWrap>
        </TradingSection>
      </Page>
    </>
  )
}

export default Chart