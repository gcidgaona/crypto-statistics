import React, { useEffect, useState, useCallback } from 'react'
import { Ticker } from '../features/Main/CryptoTicker/components/Ticker'
import { getSingleCoin } from '../api'
import { popularCryptoCurrenciesName } from '../constants/cryptocurrencies'

export const CryptoTickers = () => {

  const [cryptoCurrencies, setCryptoCurrencies] = useState([])

  const getAllCryptoData = useCallback(() => {
    Promise.all(popularCryptoCurrenciesName.map(currency => getSingleCoin(currency))).then(result => setCryptoCurrencies(result))
  }, [])
  
  useEffect(() => {
    getAllCryptoData()
  }, [getAllCryptoData])

  return (
      <div className='carousel-items-wrapper'>
        {
          cryptoCurrencies.map(crypto => {
            return (
              <Ticker key={crypto.id} crypto={crypto}/>
            )
          })
        }
      </div>
  )
}
