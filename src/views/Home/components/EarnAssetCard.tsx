import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@satoshicrypto/uikit'
import { NavLink } from 'react-router-dom'
import { poolsConfig as pools } from 'config/constants'
import { Pool } from 'state/types'

const chainId = process.env.REACT_APP_CHAIN_ID

const StyledFarmStakingCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  color: ${({ theme }) => (theme.isDark ? 'white' : '#4bca4b')};
  line-height: 44px;
`
const EarnAssetCard = () => {
  const activeNonCakePools = pools[chainId].filter((pool) => pool.isBush && !pool.isFinished && !pool.tokenName.includes('CAKE'))
  const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include CAKE
  const assets = [...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="lg">Earn</Heading>
        <CardMidContent>{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading size="lg">
            in <img src="/images/satoshicrypto/bush.svg" height="24px" width="24px" alt="Launchpads" /> Launchpads
          </Heading>
          <NavLink exact activeClassName="active" to="/bush" id="pool-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
