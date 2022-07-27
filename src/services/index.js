import axios from 'axios'

const BASE_API_URL = 'https://api.coingecko.com/api/v3/coins/'
const BASE_API_PRICE = 'https://api.coingecko.com/api/v3/simple/price/'

export const getCoinList = (currency) =>
  axios({
    url: `${BASE_API_URL}markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  }).then(res => res.data)

export const getSingleCoin = (id) =>
  axios({
    url: `${BASE_API_URL}${id}`,
  }).then(res => res.data)

export const getPriceToExchange = (from, to) =>
  axios.get(BASE_API_PRICE, {params: {ids: from, vs_currencies: to}}).then(res => res.data)


export const getHistoricalChart = (id, days = 7) =>
  axios({
    url: `${BASE_API_URL}${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
  }).then(res => res.data)


export const getTrendingCoins = (currency) =>
  axios({
    url: `${BASE_API_URL}markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
  }).then(res => res.data)
