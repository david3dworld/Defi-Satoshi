import React, { useEffect, useState, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getBusdAddress, getCakeAddress, getWbnbAddress } from 'utils/addressHelpers'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import { getCreate2Address } from '@ethersproject/address'
import { pack, keccak256 } from '@ethersproject/solidity'
import { FACTORY_SAT_ADDRESS, FACTORY_SAT_INIT_CODE_HASH, FACTORY_V2_ADDRESS, FACTORY_V2_INIT_CODE_HASH } from 'config/constants/pancakeswap'
import useRefresh from './useRefresh'

const sortsBefore = (addr:string, other: string) => {
  return addr.toLowerCase() < other.toLowerCase()
}


const useTokenInfo = (address) => {
  const [info, setInfo] = useState({})
  const { slowRefresh } = useRefresh()

  const wbnbAddress = getWbnbAddress()
  const busdAddress = getBusdAddress()

  let quoteToken = {
    symbol: 'BNB',
    address: wbnbAddress
  }
  if (address.toLowerCase() === quoteToken.address.toLowerCase()) {
    quoteToken = {
      symbol: 'BUSD',
      address: busdAddress
    }
  }

  const tokens = sortsBefore(address, quoteToken.address) ? [address, quoteToken.address] : [quoteToken.address, address];

  const LPv1 = getCreate2Address(
    FACTORY_SAT_ADDRESS,
    keccak256(['bytes'], [pack(['address', 'address'], [tokens[0], tokens[1]])]),
    FACTORY_SAT_INIT_CODE_HASH
  )

  const LPv2 = getCreate2Address(
    FACTORY_V2_ADDRESS,
    keccak256(['bytes'], [pack(['address', 'address'], [tokens[0], tokens[1]])]),
    FACTORY_V2_INIT_CODE_HASH
  )

  const fetchInfo = async () => {
    const calls = [
      {
        address,
        name: 'name',
        params: []
      },
      {
        address,
        name: 'symbol',
        params: []
      },
      {
        address,
        name: 'totalSupply',
        params: []
      },
      {
        address,
        name: 'decimals',
        params: []
      },
      {
        address,
        name: 'balanceOf',
        params: ['0x000000000000000000000000000000000000dEaD']
      },
    ];

    
    const [name, symbol, totalSupply, decimals, burned] = await multicall(erc20ABI, calls)

    /* eslint-disable */
    const ZERO = new BigNumber(0)
    let bal1v1 = ZERO, bal2v1 = ZERO, bal1v2 = ZERO, bal2v2 = ZERO

    const lpCalls = [
      {
        address: address,
        name: 'balanceOf',
        params: [LPv1]
      },
      {
        address: quoteToken.address,
        name: 'balanceOf',
        params: [LPv1]
      },
      {
        address: address,
        name: 'balanceOf',
        params: [LPv2]
      },
      {
        address: quoteToken.address,
        name: 'balanceOf',
        params: [LPv2]
      },
    ]

    try {
      [bal1v1, bal2v1, bal1v2, bal2v2] = await multicall(erc20ABI, lpCalls)
      bal1v1 = new BigNumber(bal1v1)
      bal2v1 = new BigNumber(bal2v1)
      bal1v2 = new BigNumber(bal1v2)
      bal2v2 = new BigNumber(bal2v2)
    } catch(e) {
      return;
    }

    let tokenPriceBnb = ZERO

    const weisIn1Bnb = new BigNumber(10).pow(18)
    const weisIn1Token = new BigNumber(10).pow(decimals[0])

    if (bal1v1.gt(ZERO) && bal1v2.gt(ZERO)) {
      tokenPriceBnb = bal2v1.plus(bal2v2).div(weisIn1Bnb).div(bal1v1.plus(bal1v2).div(weisIn1Token))
    } else if (bal1v1.gt(ZERO)) {
      tokenPriceBnb = bal2v1.div(weisIn1Bnb).div(bal1v1.div(weisIn1Token))
    } else if (bal1v2.gt(ZERO)) {
      tokenPriceBnb = bal2v2.div(weisIn1Bnb).div(bal1v2.div(weisIn1Token))
    }

    if (wbnbAddress.toLowerCase() === address.toLowerCase()) {
      tokenPriceBnb = new BigNumber(1)
    }

    if (name && name.length) {
      setInfo({
        name: name[0],
        symbol: symbol[0],
        totalSupply: new BigNumber(totalSupply),
        decimals: decimals[0],
        address,
        burnedAmount: new BigNumber(burned),
        tokenPriceBnb,
        lpv1: bal2v1.div(weisIn1Bnb),
        lpv2: bal2v2.div(weisIn1Bnb),
        lpaddr1: LPv1,
        lpaddr2: LPv2,
        quoteToken
      })
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [address, slowRefresh])

  return info
}

export default useTokenInfo
