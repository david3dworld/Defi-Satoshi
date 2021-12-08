import React from 'react'
import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'

const chainId = process.env.REACT_APP_CHAIN_ID

const inactiveIfo: Ifo[] = ifosConfig[chainId].filter((ifo) => !ifo.isActive)

const PastIfo = () => {
  return (
    <IfoCards>
      {inactiveIfo.map((ifo) => (
        <IfoCard key={ifo.id} ifo={ifo} />
      ))}
    </IfoCards>
  )
}

export default PastIfo
