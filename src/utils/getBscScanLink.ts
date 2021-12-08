import { ChainId } from '@satoshicrypto/sdk'

const BSCSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  56: 'bscscan.com',
  97: 'testnet.bscscan.com',
  250: 'ftmscan.com',
  4002: 'testnet.ftmscan.com',
  1666600000: 'explorer.harmony.one',
  1666700000: 'explorer.pops.one',
}

const getBscScanLink = (chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address') => {
  const prefix = `https://${BSCSCAN_PREFIXES[chainId]}`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export default getBscScanLink
