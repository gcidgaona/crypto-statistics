import React from 'react'
import { CryptoTickers } from './CryptoTickers';
import { Visualizer } from './Visualizer';
import { Exchange } from './Exchange';
import { Trending } from './Trending';

export const Main = () => {

  return (
    <div className="main-background-color p-5 flex flex-col lg:max-h-screen md:grid lg:grid-cols-12 md:grid-cols-8 sm:gap-6 md:gap-4">
          <div className='lg:col-span-3 md:col-span-8 row-span-1'>
            <CryptoTickers />
          </div>
          <div className='lg:col-span-6 md:col-span-5 row-span-1'>
            <Visualizer />
            <div>
              <Trending />
            </div>
          </div>
          <div className='lg:col-span-3 md:col-span-3 row-span-1'>
            <Exchange />
          </div>
    </div>
  )
}
