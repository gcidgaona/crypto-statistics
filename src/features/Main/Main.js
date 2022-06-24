import React from 'react'
import { Grid, Container } from '@mantine/core';
import { CryptoTickers } from './CryptoTicker/CryptoTickers';
import { Visualizer } from './Visualizer/Visualizer';
import { Exchange } from './Exchange/Exchange';

export const Main = () => {

  return (
    <div className="main-background-color">
      <Container fluid px="xl" style={{height: '100%' }}>
        <Grid
          columns={12}
          style={{paddingTop: 50, height: '90%'}}
        >
          <Grid.Col span={3}>
            <CryptoTickers />
          </Grid.Col>
          <Grid.Col span={6}>
            <Visualizer />
          </Grid.Col>
          <Grid.Col span={3}>
            <Exchange />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
