import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import HistoryChart from './HistoryChart'
import Legend from './Legend'

const StyledCard = styled(Card)`
  border: 0px solid #c962d4;
`
const PastDrawsHistoryCard: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <StyledCard>
      <CardBody>
        <Heading size="md">{TranslateString(746, 'History')}</Heading>
        <Legend />
        <HistoryChart />
      </CardBody>
    </StyledCard>
  )
}

export default PastDrawsHistoryCard
