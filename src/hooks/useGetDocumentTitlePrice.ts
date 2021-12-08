import { useEffect } from 'react'
import { usePriceSatoshiBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const cakePriceUsd = usePriceSatoshiBusd()
  useEffect(() => {
    document.title = `Satoshi - $${Number(cakePriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
  })
}
export default useGetDocumentTitlePrice
