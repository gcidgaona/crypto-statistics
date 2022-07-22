import React, {useEffect, useState, useContext} from 'react'
import GlobalCryptoContext from '../../../context/GlobalCryptoContext'
import Chart from "react-apexcharts";
import { getHistoricalChart } from '../../../api';
import { formatFiatDolar, formatValueGraph } from '../../../helpers/numbers';
import dayjs from 'dayjs';

const getDatesLabels = () => {
  const dates = [dayjs().format('YYYY-MM-DD')]
  for (let index = 0; index <= 6; index++) {
    let toDayjs = dayjs(dates[0])
    dates.unshift(toDayjs.subtract(1, 'day').format('YYYY-MM-DD'))
  }
  return dates
}

const options = {
  xaxis: {
    categories: getDatesLabels(),
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
      <Chart
        options={options}
        series={prices}
        type="area" 
        height={350}
      />
    </div>
  )
}
