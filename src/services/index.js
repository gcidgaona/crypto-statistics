import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3/'

export const getCoinList = (currency) =>
  axios({
    url: `${BASE_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  }).then(res => res.data)

export const getSingleCoin = (id) =>
  axios({
    url: `${BASE_URL}coins/${id}`,
  }).then(res => res.data)

export const getPriceToExchange = (from, to) =>
  axios.get(BASE_URL + 'simple/price/', {params: {ids: from, vs_currencies: to}}).then(res => res.data)


export const getHistoricalChart = (id, days = 7) =>
  axios({
    url: `${BASE_URL}coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
  }).then(res => res.data)


export const getTrendingCoins = () =>
  axios({
    url: `${BASE_URL}search/trending`,
  }).then(res => res.data)
