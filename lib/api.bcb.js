const axios = require('axios');

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoApi = url => axios.get(url)
const extractCotacao = response => response.data.value[0].cotacaoVenda
const getToday = () => {
  const today = new Date()

  return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}


const getCotacao = async () => {
  try {
    const today = getToday
    const url = getUrl(today);
    const response = await getCotacaoApi(url);
    const cotacao = extractCotacao(response);

    return cotacao
  } catch (error) {
    return ''
  }
}

module.exports = {
  getCotacao,
  getCotacaoApi,
  extractCotacao
}
