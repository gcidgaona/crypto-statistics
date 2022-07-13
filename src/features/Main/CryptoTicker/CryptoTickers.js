import React, { useEffect, useState, useCallback } from 'react'
import { Ticker } from './components/Ticker'
import { getSingleCoin } from '../../../api'

const popularCryptoCurrencies = ['bitcoin', 'ethereum', 'bitcoin-cash', 'tether', 'tron', 'litecoin', 'solana', 'usd-coin']
export const CryptoTickers = () => {

  const [cryptoCurrencies, setCryptoCurrencies] = useState([])

  const getAllCryptoData = useCallback(() => {
    Promise.all(popularCryptoCurrencies.map(currency => getSingleCoin(currency))).then(result => setCryptoCurrencies(result))
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
