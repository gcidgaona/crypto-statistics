import React, {useEffect, useState, useContext} from 'react'
import GlobalCryptoContext from '../../../context/GlobalCryptoContext'
import Chart from "react-apexcharts";
import { getHistoricalChart } from '../../../api';
import { formatFiatDolar, formatValueGraph } from '../../../helpers/numbers';

const options = {
  xaxis: {
    categories: ['10/11/2022', '11/11/2022', '12/11/2022', '13/11/2022', '14/11/2022', '15/11/2022', '16/11/2022', '17/11/2022'],
    tooltip: {
      enabled: false,
  },
  },
  yaxis: {
    labels: {
      formatter: (value) => formatValueGraph(value)
    }
  },
  tooltip:{
      custom: function({seriesIndex, dataPointIndex, w}) {
        let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        let date = w.globals.categoryLabels[dataPointIndex];
        
        return '<div class="arrow_box">' +
        '<div class="date-tooltip">' +
        '<p> ' + date + '</p>' +
        '</div>' +
        '<div class="price-tooltip">' +
        '<p>$ ' + formatFiatDolar(data) + '</p>' +
        '</div>' +
        '</div>';
      },
  },
  chart:{
    toolbar:{
      show: false
    }
  },
  zoom: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  dataLabels: {
    enabled: false
  },
  grid:{
    show: false
  },
}


export const GraphHistorical = () => {

  const { currencySelected } = useContext(GlobalCryptoContext)
  const [prices, setPrices] = useState([])

  const getHistoricalChartData = async () => {
    let data = await getHistoricalChart(currencySelected).then(result => result.prices)
    const getOnlyPrice = data.map(price => price[1])
    setPrices([{name: 'price', data: getOnlyPrice}])
  }

  useEffect(() => {
    getHistoricalChartData()
  }, [currencySelected])
  
  return (
    <div>
      {
        console.log(prices)
      }
      <Chart
        options={options}
        series={prices}
        type="area" 
        height={350}
      />
    </div>
  )
}
