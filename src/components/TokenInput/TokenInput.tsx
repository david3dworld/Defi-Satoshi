import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Box, Button, Flex, Text, Input, InputProps } from '@satoshicrypto/uikit'
import useI18n from 'hooks/useI18n'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  value: string
  onSelectMax?: () => void
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void
  depositFeeBP?: number
}

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-start;
`

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value, depositFeeBP }) => {
  const TranslateString = useI18n()

  return (
    <Box>
      <Flex justifyContent="flex-end" minHeight="21px" mb="8px">
        <Text color="primary" fontSize="14px">
          {max.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Input onChange={onChange} placeholder="0" value={value} />
        <Flex alignItems="center">
          <Text bold color="primary" textTransform="uppercase" mx="8px">
            {symbol}
          </Text>
          <div>
            <Button scale="sm" onClick={onSelectMax}>
              {TranslateString(452, 'Max')}
            </Button>
          </div>
        </Flex>
      </Flex>
      {depositFeeBP > 0 ? (
        <StyledMaxText>
          {TranslateString(10001, 'Deposit Fee')}: {new BigNumber(value || 0).times(depositFeeBP / 10000).toString()}{' '}
          {symbol}
        </StyledMaxText>
      ) : null}
    </Box>
  )
}

export default TokenInput
