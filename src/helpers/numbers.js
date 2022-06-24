import numeral from 'numeral'

const FORMAT_DOLAR = '0,0.00'
const FORMAT_PERCENTAGE = '0.000'

export const formatFiatDolar = (value) => {
  return numeral(value).format(FORMAT_DOLAR)
}
export const formatPercentage = (value) => {
  return numeral(value).format(FORMAT_PERCENTAGE)
}