import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, Link, Modal, Text } from '@satoshicrypto/uikit'
import ModalActions from 'components/ModalActions'
import { BASE_EXCHANGE_URL, PCS_EXCHANGE_URL } from 'config'
import styled from 'styled-components'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { PoolConfig } from '../../../config/constants/types'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  depositFeeBP?: number
  pool: PoolConfig
}

const StyledErrorMessage = styled(Text)`
  a {
    display: inline;
  }
`

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  depositFeeBP = 0,
  pool,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, tokenName)
  }, [max, tokenName])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const isBalanceZero = max.isZero() || !max
  // console.log(isBalanceZero, max)

  return (
    <Modal title={TranslateString(1068, 'Stake')} onDismiss={onDismiss}>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        depositFeeBP={depositFeeBP}
      />

      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          No tokens to stake:{' '}
          <Link fontSize="14px" bold={false} href={`${BASE_EXCHANGE_URL}/${pool.getUrl}`} external color="failure">
            {TranslateString(999, 'get')} {pool.stakingTokenName}
          </Link>
        </StyledErrorMessage>
      )}
      <ModalActions>
        <Button width="100%" variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          width="100%"
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
