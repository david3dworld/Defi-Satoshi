import React from 'react'
import { Card, CardBody, Heading, Image, Text } from '@satoshicrypto/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

const StyledListedOn = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const LinkListed = styled.a`
  float: left;
  min-width: 200px;
  margin: 5px;
`

const ListedOn = () => {
  return (
    <StyledListedOn>
      <CardBody>
        <Heading size="lg">Listed on</Heading>
        <LinkListed>
          <a href="https://www.dapp.com/app/satoshicrypto" target="_blank" rel="noreferrer">
            <Image
              src="/images/extras/dapp.png"
              alt="Dapp.com is a one-stop platform for the dapps you’ll love. Explore and enjoy thousands of ranked blockchain games, social network, tools &amp; more built on Ethereum, EOS, STEEM, NEO &amp; TRON."
              width={110}
              height={50}
            />
          </a>
        </LinkListed>
        <LinkListed>
          <a href="https://dappradar.com/bsc/defi/satoshicrypto" target="_blank" rel="noreferrer">
            <Image
              src="/images/extras/dappradar.svg"
              alt="DappRadar provides information and insights about all the existing dapps! At the tap of your finger, find the most successful and used decentralized games, casinos, and marketplaces, among others."
              width={150}
              height={50}
            />
          </a>
        </LinkListed>
      </CardBody>
    </StyledListedOn>
  )
}

export default ListedOn
