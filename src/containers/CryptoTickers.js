import React, { useEffect, useState, useCallback } from 'react'
import { Ticker } from '../features/Main/CryptoTicker/components/Ticker'
import { getSingleCoin } from '../services'
import { popularCryptoCurrenciesName } from '../constants/cryptocurrencies'
import { Skeleton } from '@mantine/core'

export const CryptoTickers = () => {

  const [cryptoCurrencies, setCryptoCurrencies] = useState([])
  const [loading, setloading] = useState(true)

  const getAllCryptoData = useCallback(() => {
    Promise.all(popularCryptoCurrenciesName.map(currency => getSingleCoin(currency))).then(result => {
      setCryptoCurrencies(result)
      setloading(false)
    })
  }, [])
  
  useEffect(() => {
    getAllCryptoData()
  }, [getAllCryptoData])

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
