import numeral from 'numeral'

const FORMAT_DOLAR = '0,0.00[00]'
const FORMAT_PERCENTAGE = '0.000'
const FORMAT_CRYPTO = '0,0.[0000]'

export const formatFiatDolar = (value) => {
  return numeral(value).format(FORMAT_DOLAR)
}
export const formatPercentage = (value) => {
  return numeral(value).format(FORMAT_PERCENTAGE)
}

export const formatValueGraph = (value) => {
  if(value > 10000) return numeral(value).format('0 a')
  if(value > 1000) return numeral(value).format('0.00a')
  return numeral(value).format(FORMAT_CRYPTO)
}

export const formatCrypto = (value) => {
  if(value > 0) return numeral(value).format(FORMAT_CRYPTO)
  return '-'
}