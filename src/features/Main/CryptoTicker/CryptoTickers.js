import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Ticker } from './components/Ticker'
import { getSingleCoin } from '../../../api'
import { Stack, ScrollArea } from '@mantine/core'

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
    <div style={{ position: "relative", height: "100%" }}>
      <ScrollArea style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} scrollbarSize={2}>
        <Stack>
          {
            cryptoCurrencies.map(crypto => {
              return (
                <Ticker key={crypto.id} crypto={crypto}/>
              )
            })
          }
        </Stack>
      </ScrollArea>
    </div>
  )
}
