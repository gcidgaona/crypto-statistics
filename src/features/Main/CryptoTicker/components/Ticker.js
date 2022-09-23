import { Card, Image, Stack, Text } from '@mantine/core'
import React, { useContext } from 'react'
import GlobalCryptoContext from '../../../../context/GlobalCryptoContext'
import { formatFiatDolar, formatPercentage } from '../../../../helpers/numbers'

export const Ticker = ({ crypto }) => {
  const { symbol, name, image, market_data } = crypto
  const { handleSetCurrency, currencySelected } = useContext(GlobalCryptoContext)

  const getColor = (value) => {
    if (value < 0) return 'red'
    if (value > 0) return 'green'
    return 'white'
  }

  const handleSetActive = (id) => {
    handleSetCurrency(id)
  }

  return (
    <Card radius="lg" className="crypto-ticker cursor-pointer" onClick={() => handleSetActive(crypto.id)}>
      <Card.Section className={currencySelected === crypto.id ? 'selected-ticker' : 'ticker' } style={{paddingLeft: 30, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
        <Stack spacing={6}>
          <div className='flex items-center gap-3'>
            <div style={{ backgroundColor: '#0d0f11' }} className='p-3 rounded-xl'>
              <Image src={image.thumb} width={25} height={25} alt="Norway" />
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Text size='lg' weight={700} color='white'className='uppercase'>
                {symbol}
              </Text>
              <Text size='xs'>( {name} )</Text>
            </div>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <Text size='xl' color='white'>$  {formatFiatDolar(market_data.current_price.usd)}</Text>
            <Text color={getColor(market_data.price_change_percentage_24h)} size='sm' weight={400}>{formatPercentage(market_data.price_change_percentage_24h)}%</Text>
          </div>
        </Stack>
      </Card.Section>
    </Card>
  )
}
