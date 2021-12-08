import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
} from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative
`

const ProgressWrapperInner = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 30px;

  ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    margin-top: 0;    
  }
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const LotteryProgress = () => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)

  const percentage = getTicketSaleStep()*100/getLotteryDrawStep(currentMillis);

  console.log('-- getTicketSaleStep : ', getTicketSaleStep());
  console.log('-- getLotteryDrawStep : ', getLotteryDrawStep(currentMillis));
  console.log('-- percentage : ', percentage);

  return (
    <ProgressWrapper>
      <ProgressWrapperInner>
        {/* <Progress primaryStep={getLotteryDrawStep(currentMillis)} secondaryStep={getTicketSaleStep()} showProgressBunny /> */}
        <div style={{width: '60%', display: 'inline-block'}}>
          <CircularProgressbar value={80} strokeWidth={5} styles={{
            path: {
              stroke: '#ea268d',
            },
          }}/>;
        </div>
        
        <TopTextWrapper>
          <StyledPrimaryText fontSize="20px" bold color="contrast">
            {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
          </StyledPrimaryText>
          <Text fontSize="20px" bold color="text">
            {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Until lottery draw')}
          </Text>
        </TopTextWrapper>
        {lotteryHasDrawn && (
          <BottomTextWrapper>
            <Text color="invertedContrast">
              {timeUntilLotteryDraw} {TranslateString(0, 'Until lottery draw')}
            </Text>
          </BottomTextWrapper>
        )}
      </ProgressWrapperInner>
    </ProgressWrapper>
  )
}

export default LotteryProgress
