import contracts from './contracts'
import { FarmConfig, QuoteToken } from '../types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT',
    lpAddresses: {
      97: '',
      56: '0x6Eaa1315cACe8e99548f330E4D63Ea0d1F662bea', // SAT-BUSD LP
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x6Eaa1315cACe8e99548f330E4D63Ea0d1F662bea',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x669339b558a8C8E2C07D33F24d33B31A75942C0f',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 26,
    isV2: true,
    isVisible: false,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-CHTRv2 LP',
    lpAddresses: {
      97: '',
      56: '0xfff03340300ebC4cF29868Da7Ef6Fb7728595F3c',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.CHTRv2,
    quoteTokenAdresses: contracts.chtrv2,
  },  
  {
    pid: 28,
    isPsc: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-BUSD LP (PCS)',
    lpAddresses: {
      97: '',
      56: '0x1D933f38B16ACB8b92Cc5e4616424622e7D5404E',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 29,
    isPsc: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'SAT-BNB LP (PCS)',
    lpAddresses: {
      97: '',
      56: '0x31b747403395826D20B9B9F46F5c592F8737446A',
    },
    tokenSymbol: 'SAT',
    tokenAddresses: {
      97: '',
      56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 4,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0x7213a321F1855CF1779f42c0CD85d3D95291D34C', // ETH-BUSD LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '',
      56: '0x8435D43dBc2dF034967229560E7098Ba6d135d2a', // BNB-BUSD
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'DOT',
    lpAddresses: {
      97: '',
      56: '0x820302AbCFc29806073914D7BF6e6bB05e125406', // DOT-BNB LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 7,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ADA',
    lpAddresses: {
      97: '',
      56: '0x9A4c5D8cEfd73b463773DBDff79EAD6A57b204B8', // ADA-BNB LP
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '',
      56: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 8,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x97eCE336f43AE9Ad195B86F3571Cc46Fe23E1667', // CAKE-BNB LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 9,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ONE',
    lpAddresses: {
      97: '',
      56: '0x21f8D007d04b415020cE811F52AF3892f71cE1F1', // ONE-BNB LP
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      97: '',
      56: '0x03fF0ff224f904be3118461335064bB48Df47938',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 10,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'UST',
    lpAddresses: {
      97: '',
      56: '0x7bC6bd6DFC708559BF381b2C58621FAf3B8536ec', // UST-BUSD LP
    },
    tokenSymbol: 'UST',
    tokenAddresses: {
      97: '',
      56: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 11,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'USDC',
    lpAddresses: {
      97: '',
      56: '0x94D9229d1596edc9836e66Af0B2403b433995AD8', // USDC-BUSD LP
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 12,
    isV2: true,
    isTokenOnly: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '',
      56: '0x8435D43dBc2dF034967229560E7098Ba6d135d2a', // BUSD-BNB LP
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 13,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'BNB-BUSD',
    lpAddresses: {
      97: '',
      56: '0x8435D43dBc2dF034967229560E7098Ba6d135d2a', // BNB-BUSD LP
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 14,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ETH-BNB',
    lpAddresses: {
      97: '',
      56: '0x75B809150e5d252Dae4818704f8d72e593379a66', // ETH-BNB LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 15,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'BTCB-BNB',
    lpAddresses: {
      97: '',
      56: '0x9B9F2e1e2859d57170226bd835CA33F961944595', // BTCB-BNB LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 16,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'DOT-BNB',
    lpAddresses: {
      97: '',
      56: '0x820302AbCFc29806073914D7BF6e6bB05e125406', // DOT-BNB LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 17,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ADA-BNB',
    lpAddresses: {
      97: '',
      56: '0x9A4c5D8cEfd73b463773DBDff79EAD6A57b204B8', // ADA-BNB LP
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      97: '',
      56: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 18,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x97eCE336f43AE9Ad195B86F3571Cc46Fe23E1667',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 19,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'ONE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x21f8D007d04b415020cE811F52AF3892f71cE1F1',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      97: '',
      56: '0x03fF0ff224f904be3118461335064bB48Df47938',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 20,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'INJ-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x12f71feB24D0f6dC4F1953b8B1F24F35B763cd57',
    },
    tokenSymbol: 'INJ',
    tokenAddresses: {
      97: '',
      56: '0xa2B726B1145A4773F68593CF171187d8EBe4d495',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 21,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x94D9229d1596edc9836e66Af0B2403b433995AD8',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 22,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x9037f5341146CbcAEc88474807724c9C269f3327',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '',
      56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 23,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x002bAb3B0df9686EFd04A967A780A72d8471F739',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 24,
    isV2: true,
    isVisible: true,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'UST-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7bC6bd6DFC708559BF381b2C58621FAf3B8536ec',
    },
    tokenSymbol: 'UST',
    tokenAddresses: {
      97: '',
      56: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 25,
    isV2: true,
    isVisible: false,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0C11943A150E3b6C0E06a78CB26F132dAd779c2D',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 27,
    isV2: true,
    isVisible: false,
    decimals: 18,
    quoteDecimals: 18,
    lpSymbol: 'CHTRv2-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xD0c0A8e7E041210759445C4ff75df2818981D12C',
    },
    tokenSymbol: 'CHTRv2',
    tokenAddresses: {
      97: '',
      56: '0xA23a065b6525711811DA2ceE2EdAd9E2c9f87B0c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

















  
  // {
  //   pid: 26,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'SAT-CHTRv2 LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xfff03340300ebC4cF29868Da7Ef6Fb7728595F3c',
  //   },
  //   tokenSymbol: 'SAT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x4Ee80372D69260d72826f6e8F2351201618709Ae',
  //   },
  //   quoteTokenSymbol: QuoteToken.CHTRv2,
  //   quoteTokenAdresses: contracts.chtrv2,
  // },
  // {
  //   pid: 13,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'BNB-BUSD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x8435D43dBc2dF034967229560E7098Ba6d135d2a', // BNB-BUSD LP
  //   },
  //   tokenSymbol: 'BNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 14,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'ETH-BNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x75B809150e5d252Dae4818704f8d72e593379a66', // ETH-BNB LP
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 15,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'BTCB-BNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x9B9F2e1e2859d57170226bd835CA33F961944595', // BTCB-BNB LP
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 16,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'DOT-BNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x820302AbCFc29806073914D7BF6e6bB05e125406', // DOT-BNB LP
  //   },
  //   tokenSymbol: 'DOT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 17,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'ADA-BNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x9A4c5D8cEfd73b463773DBDff79EAD6A57b204B8', // ADA-BNB LP
  //   },
  //   tokenSymbol: 'ADA',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 18,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x97eCE336f43AE9Ad195B86F3571Cc46Fe23E1667',
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 19,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'ONE-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x21f8D007d04b415020cE811F52AF3892f71cE1F1',
  //   },
  //   tokenSymbol: 'ONE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x03fF0ff224f904be3118461335064bB48Df47938',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 20,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'INJ-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x12f71feB24D0f6dC4F1953b8B1F24F35B763cd57',
  //   },
  //   tokenSymbol: 'INJ',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xa2B726B1145A4773F68593CF171187d8EBe4d495',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 21,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x94D9229d1596edc9836e66Af0B2403b433995AD8',
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 22,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'USDC-USDT LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x9037f5341146CbcAEc88474807724c9C269f3327',
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.USDT,
  //   quoteTokenAdresses: contracts.usdt,
  // },
  // {
  //   pid: 23,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'DAI-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x002bAb3B0df9686EFd04A967A780A72d8471F739',
  //   },
  //   tokenSymbol: 'DAI',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 24,
  //   isV2: true,
  //   isVisible: true,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'UST-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7bC6bd6DFC708559BF381b2C58621FAf3B8536ec',
  //   },
  //   tokenSymbol: 'UST',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 25,
  //   isV2: true,
  //   isVisible: false,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'USDT-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0C11943A150E3b6C0E06a78CB26F132dAd779c2D',
  //   },
  //   tokenSymbol: 'USDT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x55d398326f99059fF775485246999027B3197955',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 27,
  //   isV2: true,
  //   isVisible: false,
  //   decimals: 18,
  //   quoteDecimals: 18,
  //   lpSymbol: 'CHTRv2-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xD0c0A8e7E041210759445C4ff75df2818981D12C',
  //   },
  //   tokenSymbol: 'CHTRv2',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xA23a065b6525711811DA2ceE2EdAd9E2c9f87B0c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
]

export default farms
