const convert = (price, amount) => {
  return price * amount
}

const toMoney = value => {
  return parseFloat(value).toFixed(2)
}

module.exports = {
  convert,
  toMoney
}
