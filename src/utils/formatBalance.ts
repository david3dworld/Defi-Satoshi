import BigNumber from 'bignumber.js'
import { farmsConfig, poolsConfig, ifosConfig } from '../config/constants'
import { getFarms } from '../../scripts/generateConfig/parser'

const chainId = process.env.REACT_APP_CHAIN_ID

const getDecimalsFromFarm = ( tokenName: string ) => {
  const farms = farmsConfig[chainId].filter((farm) => {
    return farm.lpSymbol === tokenName
  })
  if( farms[0] && farms[0].isTokenOnly && farms[0].decimals ) return farms[0].decimals
  return 18;
}

const getDecimalsFromPool = ( tokenName: string ) => {
  const pools = poolsConfig[chainId].filter((pool) => {
    return pool.tokenName === tokenName
  })
  return pools[0] ? pools[0].tokenDecimals : null;
}

const getDecimalsFromIfo = ( tokenName: string ) => {
  const ifos = ifosConfig[chainId].filter((ifo) => {
    return ifo.tokenSymbol === tokenName
  })
  return ifos[0] ? ifos[0].tokenDecimals : null;
}

export const getBalanceNumber = (balance: BigNumber, tokenName: string) => {
  let decimals = 18;
  if( getDecimalsFromFarm(tokenName) ) decimals = getDecimalsFromFarm(tokenName)
  else if( getDecimalsFromPool(tokenName) ) decimals = getDecimalsFromPool(tokenName)
  else if( getDecimalsFromIfo(tokenName) ) decimals = getDecimalsFromIfo(tokenName)
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, tokenName: string) => {
  // @ts-ignore
  let decimals = 18;
  if( getDecimalsFromFarm(tokenName) ) decimals = getDecimalsFromFarm(tokenName)
  else if( getDecimalsFromPool(tokenName) ) decimals = getDecimalsFromPool(tokenName)
  else if( getDecimalsFromIfo(tokenName) ) decimals = getDecimalsFromIfo(tokenName)
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getProperDecimals = (price: number) => {
  if (price > 100000) return 0

  let d = 0;
  while (price < 10**(-d) && d < 10) {
    d++
  }
  return d + 2
}

export const getPrettyPrice = (price: number) => {
  const decimals = [
    {
      min: 100000,
      decimals: 0,
    },
    {
      min: 1,
      decimals: 3
    },
    {
      min: 0.1,
      decimals: 4
    },
    {
      min: 0.01,
      decimals: 5
    },
    {
      min: 0.001,
      decimals: 6
    },
    {
      min: 0.0001,
      decimals: 7
    },
    {
      min: 0.00001,
      decimals: 8
    },
    {
      min: 0.000001,
      decimals: 9
    },
    {
      min: 0.0000001,
      decimals: 10
    },
    {
      min: 0.00000001,
      decimals: 11
    },
    {
      min: 0,
      decimals: 13
    }
  ];

  let i = 0;
  while (i < decimals.length - 1) {
    if (price >= decimals[i].min) break;
    i++;
  }
  const d = decimals[i].decimals;

  // return price.toFixed(d).toLocaleString();
  return price.toLocaleString('en-US', {maximumFractionDigits:d});
}
