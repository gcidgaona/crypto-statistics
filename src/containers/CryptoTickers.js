import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Ticker } from '../features/Main/CryptoTicker/components/Ticker'
import { getSingleCoin } from '../services'
import { popularCryptoCurrenciesName } from '../constants/cryptocurrencies'
import { Skeleton } from '@mantine/core'
import PriceBtcContext from '../context/PriceBtcContext'

export const CryptoTickers = () => {

  const [cryptoCurrencies, setCryptoCurrencies] = useState([])
  const [loading, setloading] = useState(true)
  const { handlePriceBtc } = useContext(PriceBtcContext)

  const getAllCryptoData = useCallback(() => {
    Promise.all(popularCryptoCurrenciesName.map(currency => getSingleCoin(currency))).then(result => {
      setCryptoCurrencies(result)
      setloading(false)
    })
  }, [])
  
  useEffect(() => {
    getAllCryptoData()
  }, [getAllCryptoData])

  useEffect(() => {
    const { market_data } = cryptoCurrencies?.find(crypto => crypto.id === 'bitcoin') || {}
    const getPrice = market_data?.current_price.usd || 0
    handlePriceBtc(getPrice)
  }, [cryptoCurrencies])
  
  

    return (
      <div className='carousel-items-wrapper'>
        {
          loading && (
            <>
              <Skeleton height={90} mt={6} radius="md" />
              <Skeleton height={90} mt={6} radius="md" />
              <Skeleton height={90} mt={6} radius="md" />
              <Skeleton height={90} mt={6} radius="md" />
              <Skeleton height={90} mt={6} radius="md" />
            </>
          )
        }
        {
          !loading && (
            cryptoCurrencies.map(crypto => {
              return (
                <Ticker key={crypto.id} crypto={crypto}/>
              )
            }))
        }
      </div>
    )

}
