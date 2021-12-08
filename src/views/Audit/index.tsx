import React from 'react'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import ComingSoon from 'components/ComingSoon'

const Audit = () => {
  const { account } = useWeb3React()

  return (
    <Page>
      <ComingSoon />
    </Page>
  )
}

export default Audit
