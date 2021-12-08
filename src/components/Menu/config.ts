import { MenuEntry } from '@satoshicrypto/uikit'
import { ChainId } from '@satoshicrypto/sdk'
import { contracts } from '../../config/constants'

const chainId = process.env.REACT_APP_CHAIN_ID
const mainToken = {
  [ChainId.MAINNET]: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  [ChainId.BSCTESTNET]: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  [ChainId.FANTOMNET]: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
  [ChainId.FANTOMTESTNET]: '0xC490728d1cAC9F6481D8eF40F137633FA1D65956',
  [ChainId.HARMONYNET]: '0x4970417a897Cc7ae812b9b8Db34bb44833C26739',
  [ChainId.HARMONYTESTNET]: '0x4970417a897Cc7ae812b9b8Db34bb44833C26739',
}
const usdToken = {
  [ChainId.MAINNET]: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  [ChainId.BSCTESTNET]: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  [ChainId.FANTOMNET]: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  [ChainId.FANTOMTESTNET]: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  [ChainId.HARMONYNET]: '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa',
  [ChainId.HARMONYTESTNET]: '0x0ab43550a6915f9f67d0c454c2e90385e6497eaa',
}


const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href:
        `https://swap.satoshicrypto.finance/#/swap?inputCurrency=BNB&outputCurrency=0x4Ee80372D69260d72826f6e8F2351201618709Ae`,
        target: '_blank',
      },
      {
        label: 'Exchange (Pancakeswap)',
        href:
        `https://swappcs.satoshicrypto.finance/#/swap?inputCurrency=BNB&outputCurrency=0x4Ee80372D69260d72826f6e8F2351201618709Ae`,
        target: '_blank',
      },
      {
        label: 'Liquidity',
        href:
        `https://swap.satoshicrypto.finance/#/add/${chainId ? usdToken[chainId] : ''}/${chainId ? mainToken[chainId] : ''}`,
        target: '_blank',
      },
      {
        label: 'Liquidity (Pancakeswap)',
        href:
        `https://swappcs.satoshicrypto.finance/#/add/${chainId ? usdToken[chainId] : ''}/${chainId ? mainToken[chainId] : ''}`,
        target: '_blank',
      },
    ],
  },
  {
    label: 'Earn',
    icon: 'FarmIcon',
    items: [
      {
        label: 'Farms',
        href: '/farms',
      },
      {
        label: 'Pools',
        href: '/pools',
      },
      {
        label: 'Launchpad',
        href: '/bush',
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    items: [
      {
        label: 'NFT Marketplace',
        href: 'https://nft.satoshicrypto.finance',
        target: '_blank',
      },
      {
        label: 'NFT Gaming',
        href: '/nftgaming',
      },
    ],
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },  
  // {
  //   label: 'Presale Launchpad',
  //   icon: 'SunIcon',
  //   href: 'https://presale.satoshicrypto.finance',
  // },
  {
    label: 'Satoshi Hosting Dapp',
    icon: 'SunIcon',
    items: [
      {
        label: 'Dashboard',
        href: `https://launchpad.satoshicrypto.finance/#/`,
        target: '_blank',
      },
      {
        label: 'Start Presale',
        href: `https://launchpad.satoshicrypto.finance/#/start`,
        target: '_blank',
      },
    ],
  },
  {
    label: 'Chart',
    icon: 'InfoIcon',
    href: 'https://satoshicrypto.finance/#/chart/0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Referrals',
        href: '/referrals',
      },
      // {
      //   label: 'Swap V1 to V2',
      //   href: 'https://swapv2.satoshicrypto.finance',
      // },
      {
        label: 'Audit',
        href: 'https://satoshicrypto.finance/files/techaudit_satoshi.pdf',
        target: '_blank',
      },
    ],
  },
  
]

export default config
