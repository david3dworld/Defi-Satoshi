import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@satoshicrypto/uikit'
import Countdown from 'react-countdown';
import useI18n from 'hooks/useI18n'
import {DEFI_LAUNCH_TIME} from '../../../config/index'

const StyledFarmCounterDownCard = styled(Card)`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.card};
  border: 0px solid #c962d4;
  margin-top: 20px;
  margin-bottom: 20px;
`

const CounterdownBody = styled.div`  
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 50px;
  line-height: 60px;
  font-weight: bold;
`

const CounterSell = styled.span`
  display: inline-block;
  width: 45px;
  margin: 5px 2px 10px;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  color: #ffffff;
`

const CounterSplit = styled.span`
  display: inline-block;
  width: 20px;
  margin: 5px 2px 10px;
  padding: 0;
`

const FarmCounterDownCard = () => {
  const TranslateString = useI18n()
  
  const counterdownRenderer = ({ days, hours, minutes, seconds, milliseconds, completed }) => {
    console.log('-- counterdownRenderer completed : ', completed, hours, minutes, seconds, milliseconds);
    if (completed){
      return (
        <div>
          <Heading size="lg" mb="24px">
            Farms was started
          </Heading>
          <CounterdownBody>
            <CounterSell>0</CounterSell>
            <CounterSell>0</CounterSell>
            <CounterSplit>:</CounterSplit>
            <CounterSell>0</CounterSell>
            <CounterSell>0</CounterSell>
            <CounterSplit>:</CounterSplit>
            <CounterSell>0</CounterSell>
            <CounterSell>0</CounterSell>
            <CounterSplit>:</CounterSplit>
            <CounterSell>0</CounterSell>
            <CounterSell>0</CounterSell>
          </CounterdownBody>
        </div>        
      );
    } 
    
    const d0 = Math.floor(days/10);
    const d1 = days - d0 * 10;
    const h0 = Math.floor(hours/10);
    const h1 = hours - h0 * 10;
    const m0 = Math.floor(minutes/10);
    const m1 = minutes - m0 * 10;
    const s0 = Math.floor(seconds/10);
    const s1 = seconds - s0 * 10;
    return (
      <div>
        <Heading size="lg" mb="24px">
          Farms and Pools Starts In
        </Heading>
        <CounterdownBody>
          <CounterSell>{d0}</CounterSell>
          <CounterSell>{d1}</CounterSell>
          <CounterSplit>:</CounterSplit>
          <CounterSell>{h0}</CounterSell>
          <CounterSell>{h1}</CounterSell>
          <CounterSplit>:</CounterSplit>
          <CounterSell>{m0}</CounterSell>
          <CounterSell>{m1}</CounterSell>
          <CounterSplit>:</CounterSplit>
          <CounterSell>{s0}</CounterSell>
          <CounterSell>{s1}</CounterSell>
        </CounterdownBody>
        <Text>{'Please don\'t stake until the farms and pools start.'}</Text>
      </div>
      
      
    );
  };

  return (
    <StyledFarmCounterDownCard>
      <CardBody>
        <>
          <Countdown date={DEFI_LAUNCH_TIME} renderer={counterdownRenderer}/>
        </>
      </CardBody>
    </StyledFarmCounterDownCard>
  )
}

export default FarmCounterDownCard
