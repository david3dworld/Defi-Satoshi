import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex } from '@satoshicrypto/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const chainId = process.env.REACT_APP_CHAIN_ID

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const PanelWrap = styled.div`
  background-color: #121827;
  border-radius: 30px;
  padding: 30px;
`

const StepWrap = styled.div`
  border: 1px solid #524b63;
  border-radius: 10px;
  margin-bottom: 20px;
`

const ImageSec = styled.div`
  text-align: center
`

const ImageWrap = styled.img`
  text-align: center
`

const StepHeader = styled.div`
  border-bottom: 1px solid #524b63;
  padding: 20px;
`

const StepBody = styled.div`
  padding: 20px;
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig[chainId].find((ifo) => ifo.isActive)

const Ifo: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <PanelWrap>
          <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          <StepWrap>
            <StepHeader>
              <Heading>{TranslateString(594, 'Before Sale')}:</Heading>  
            </StepHeader>
            <StepBody>
              <List>
                <li>{TranslateString(596, 'Buy CAKE and BNB tokens')}</li>
                <li>{TranslateString(598, 'Get CAKE-BNB LP tokens by adding CAKE and BNB liquidity')}</li>
              </List>
              <Flex>
                <LinkExternal href="https://swap.satoshicrypto.finance/#/swap" mr="16px">
                  {TranslateString(1060, 'Buy SAT')}
                </LinkExternal>
                <LinkExternal href="https://swap.satoshicrypto.finance/#/add/ETH/0x4Ee80372D69260d72826f6e8F2351201618709Ae">
                  {TranslateString(1062, 'Get LP tokens')}
                </LinkExternal>
              </Flex>
            </StepBody>
          </StepWrap>
          
          <StepWrap>
            <StepHeader>
              <Heading>{TranslateString(600, 'During Sale')}:</Heading>
            </StepHeader>
            <StepBody>
              <List>
                <li>{TranslateString(602, 'While the sale is live, commit your Satoshi-LP tokens to buy the IFO tokens')}</li>
              </List>
            </StepBody>
          </StepWrap>

          <StepWrap>
            <StepHeader>
              <Heading>{TranslateString(604, 'After Sale')}:</Heading>
            </StepHeader>
            <StepBody>
              <List>
                <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
                <li>{TranslateString(608, 'Done!')}</li>
              </List>
              <Text as="div" pt="16px">
                <Button
                  as="a"
                  variant="secondary"
                  href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering"
                >
                  {TranslateString(610, 'Read more')}
                </Button>
              </Text>
            </StepBody>
          </StepWrap>
        </PanelWrap>
        <PanelWrap>
          <div>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IFO?')}</Title>
            <Text mb={3}>
              {TranslateString(
                514,
                'Launch your project with Satoshi, Binance Smart Chain’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.',
              )}
            </Text>
            <Button
              as="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLScGdT5rrVMr4WOWr08pvcroSeuIOtEJf1sVdQGVdcAOqryigQ/viewform"
              external
            >
              {TranslateString(516, 'Apply to launch')}
            </Button>            
          </div>
          <ImageSec>
            <ImageWrap src="/images/ifo-bunny.png" alt="ifo bunny" width="436px" height="356px" />
          </ImageSec>
        </PanelWrap>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
