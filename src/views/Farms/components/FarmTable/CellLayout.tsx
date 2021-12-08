import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-size: 12px;
  color: #a9a9ff;
  text-align: left;
  text-transform: uppercase;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: flex-end;
  height: 32px;
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
