import { contracts as addresses } from 'config/constants'
import { Address } from 'config/constants/types'
import { ChainId } from '@satoshicrypto/sdk'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].cake)
}
export const getMasterChefAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].masterChef)
}
export const getMulticallAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].mulltiCall)
}
export const getWbnbAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  
  let bnbAaddr = addresses[chainId].wbnb
  if( parseInt(chainId) === ChainId.FANTOMNET || parseInt(chainId) === ChainId.FANTOMTESTNET ) bnbAaddr = addresses[chainId].wftm
  if( parseInt(chainId) === ChainId.HARMONYNET || parseInt(chainId) === ChainId.HARMONYTESTNET ) bnbAaddr = addresses[chainId].wone

  return getAddress(bnbAaddr)
}
export const getLotteryAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].lottery)
}
export const getLotteryTicketAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].pancakeRabbits)
}
export const getBunnyFactoryAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].bunnyFactory)
}
export const getClaimRefundAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].claimRefund)
}
export const getPointCenterIfoAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].bunnySpecial)
}
export const getReferralAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].referral)
}

export const getBusdAddress = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return getAddress(addresses[chainId].busd)
}
