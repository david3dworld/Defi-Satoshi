import React, { useEffect, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS, Text } from '@satoshicrypto/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPriceList, useFetchProfile, useFetchPublicData } from 'state/hooks'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Page from './components/layout/Page'
import Pools from './views/Pools'
// import GlobalCheckBullHiccupClaimStatus from './views/Collectibles/components/GlobalCheckBullHiccupClaimStatus'
import history from './routerHistory'

const Footer = styled.div`
  background-color: #000;
`

const StyledPage = styled(Page)`
  min-height: unset;
  text-align: center;
`

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Referrals = lazy(() => import('./views/Referrals'))
const Ifos = lazy(() => import('./views/Ifos'))
const Vault = lazy(() => import('./views/Vault'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
const Bush = lazy(() => import('./views/Bush'))
const Audit = lazy(() => import('./views/Audit'))
const NftMarketplace = lazy(() => import('./views/NftMarketplace'))
const NftGaming = lazy(() => import('./views/NftGaming'))
const Chart = lazy(() => import('./views/Chart'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  useFetchPublicData()
  useFetchProfile()
  // useFetchPriceList()
  useGetDocumentTitlePrice()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Farms tokenMode />
            </Route>
            <Route path="/bush">
              <Bush />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route path="/referrals">
              <Referrals />
            </Route>
            <Route path="/vault">
              <Vault />
            </Route>
            <Route path="/nftmarket">
              <NftMarketplace />
            </Route>
            <Route path="/nftgaming">
              <NftGaming />
            </Route>
            <Route path="/audit">
              <Audit />
            </Route>
            <Route path="/chart/:token" component={Chart} />
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <Footer>
        <StyledPage>
          <Text style={{color: '#aaa', fontSize: '16px'}}>
            Copyright&nbsp;&nbsp;&#169;&nbsp;&nbsp;2021&nbsp;&nbsp;SatoshiCrypto&nbsp;&nbsp;|&nbsp;&nbsp;All&nbsp;&nbsp;rights&nbsp;&nbsp;reserved
          </Text>
        </StyledPage>
      </Footer>
      
      
      <EasterEgg iterations={2} />
      <ToastListener />
      {/* <GlobalCheckBullHiccupClaimStatus /> */}
    </Router>
  )
}

export default React.memo(App)
