import React from 'react'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import ComingSoon from 'components/ComingSoon'

const NftGaming = () => {
  const { account } = useWeb3React()

  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <iframe className="iframe" src="https://slotomania.com" height="100%" width="100%" title="game" style={{marginTop: 100, position: 'absolute', top: 0, left: 16}} />

    </div>
    // <Page>
    //   <ComingSoon />
    // </Page>
  )
}

export default NftGaming
