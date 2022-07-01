import { Card, Image, Stack, Text } from '@mantine/core'
import React, { useContext, useState } from 'react'
import GlobalCryptoContext from '../../../../context/GlobalCryptoContext'
import { formatFiatDolar, formatPercentage } from '../../../../helpers/numbers'

export const Ticker = ({ crypto }) => {
  const { symbol, name, image, market_data } = crypto
  const { handleSetCurrency, currencySelected } = useContext(GlobalCryptoContext)
  const [isActive, setIsActive] = useState(false)

  const getColor = (value) => {
    if (value < 0) return 'red'
    if (value > 0) return 'green'
    return 'white'
  }

  const handleSetActive = (id) => {
    handleSetCurrency(id)
    setIsActive(true)
  }

  return (
    <Card radius="lg" style={{cursor: 'pointer', marginBottom: 12}} className="w-60 min-w-60" onClick={() => handleSetActive(crypto.id)}>
      <Card.Section className={currencySelected == crypto.id ? 'selected-ticker' : 'ticker' } style={{paddingLeft: 30, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
        <Stack spacing={6}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ backgroundColor: '#0d0f11', padding: 10, borderRadius: 12 }}>
              <Image src={image.thumb} width={25} height={25} alt="Norway" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text size='lg' weight={700} color='white' style={{ textTransform: 'uppercase' }}>
                {symbol}
              </Text>
              <Text size='xs'>( {name} )</Text>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Text size='xl' color='white'>$  {formatFiatDolar(market_data.current_price.usd)}</Text>
            <Text color={getColor(market_data.price_change_percentage_24h)} size='sm' weight={400}>{formatPercentage(market_data.price_change_percentage_24h)}%</Text>
          </div>
        </Stack>
      </Card.Section>
    </Card>
  )
}
