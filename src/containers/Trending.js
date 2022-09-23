import React from 'react'
import Carousel from '../features/Main/Trending/Carousel'
import { Text } from '@mantine/core'

export const Trending = () => {
  
  return (
    <div className='pl-4'>
      <Text size='xl' color='white' weight={600}>Last Top 7 search</Text>
      <div>
        <Carousel />
      </div>
    </div>
  )
}
