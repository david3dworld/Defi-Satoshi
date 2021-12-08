/* eslint-disable */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@satoshicrypto/uikit'
import getLotteryRoundData from 'utils/getLotteryRoundData'
import useI18n from 'hooks/useI18n'
import PastLotterySearcher from './PastLotterySearcher'
import PastRoundCard from './PastRoundCard'
import Loading from '../Loading'
import useGetRecentLotteryRoundData from '../../hooks/useGetRecentLotteryRoundData'
import { lottery } from 'views/Lottery/utils/singleLottery'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledCard = styled(Card)`
  border: 0px solid #c962d4;
`

const StyledCardBody = styled(CardBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 552px; // height of final card
`

const PastLotteryRoundViewer = () => {
  const [state, setState] = useState({
    roundData: null,
    error: { message: null, type: null },
    isInitialized: false,
    isLoading: true,
  })
  const { data: initialLotteryData, mostRecentLotteryNumber } = useGetRecentLotteryRoundData()
  const TranslateString = useI18n()
  const { roundData, error, isInitialized, isLoading } = state

  useEffect(() => {
    if (initialLotteryData) {
      setState((prevState) => ({ ...prevState, isLoading: false, isInitialized: true, roundData: initialLotteryData }))
    }
  }, [initialLotteryData, setState])

  const handleSubmit = async (lotteryNumber: number) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    lottery(lotteryNumber)
      .then((data) => {
        // @ts-ignore
        if (data.error) {
          setState((prevState) => ({
            ...prevState,
            error: {
              message: TranslateString(1076, 'The lottery number you provided does not exist'),
              type: 'out of range',
            },
            isLoading: false,
            isInitialized: true,
          }))
        } else {
          setState((prevState) => ({
            ...prevState,
            error: { message: null, type: null },
            roundData: data,
            isLoading: false,
            isInitialized: true,
          }))
        }
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          error: { message: TranslateString(1078, 'Error fetching data'), type: 'api' },
          isLoading: false,
          isInitialized: true,
        }))
      })
  }

  return (
    <Wrapper>
      <PastLotterySearcher initialLotteryNumber={mostRecentLotteryNumber} onSubmit={handleSubmit} />
      {!isInitialized || isLoading ? (
        <StyledCard>
          <StyledCardBody>
            <Loading />
          </StyledCardBody>
        </StyledCard>
      ) : (
        <PastRoundCard error={error} data={roundData} />
      )}
    </Wrapper>
  )
}

export default PastLotteryRoundViewer
