import React, { useContext, useEffect, useState } from 'react'
import { getTrendingCoins } from '../../../services';
import { Image, Text } from '@mantine/core'
import PriceBtcContext from '../../../context/PriceBtcContext';
import { formatFiatDolar } from '../../../helpers/numbers';

export default function Carousel() {
  const [active, setActive] = useState(2);
  const [trends, setTrends] = useState([])
  const { priceBtc } = useContext(PriceBtcContext)

  const setStyleActive = (index) => {
    if(index === active){
      return 'active'
    }
    if(index === active - 1){
      return 'prev'
    }
    if(index === active + 1){
      return 'next'
    }
    return ''
  }

  const setNewActive = (index) => {
    setActive(index);
  }

  const getTrending = async () => {
    let resp = await getTrendingCoins();
    const { coins } = resp;
    console.log(coins);
    setTrends(coins);
  }

  useEffect(() => {
    getTrending()
  }, [])
  
  return (
    <div className="container">
      <div className="slider">
        {trends.map((coin, i) => (
          <div key={i} className={`slide flex justify-between ${setStyleActive(i)}`} onClick={() => setNewActive(i)}>
            <section className='flex gap-4 items-center'>
              <div style={{ backgroundColor: '#0d0f11', padding: 10, borderRadius: 12 }}>
                <Image src={coin.item.small} width={40} height={40} alt="Norway" />
              </div>
              <div>
                <div className='flex flex-row gap-2 items-center'>
                  <Text size='lg' weight={700} color='white' className='uppercase'>
                      {coin.item.symbol}
                  </Text>
                  <Text size='xs'>( {coin.item.name} )</Text>
                </div>
                <div>
                <Text size='xs'>Rank: {coin.item.market_cap_rank}</Text>
                </div>
              </div>
            </section>
            <section>
              <div>
                <Text size='xl' color='white'>$ {formatFiatDolar(coin.item.price_btc * priceBtc)}</Text>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}
