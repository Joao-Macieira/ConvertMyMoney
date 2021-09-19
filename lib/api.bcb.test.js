const api = require('./api.bcb');
const axios = require('axios');

jest.mock('axios');

test('getCotaçãoAPi', () => {
  const response = {
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  }

  axios.get.mockResolvedValue(response)

  api.getCotacaoApi('url').then(res => {
    expect(res).toEqual(response)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  })

  expect(cotacao).toBe(3.90)
})

describe('getToday', () => {
  const RealDate = Date

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date)
      }
    }
  }

  afterEach(() => {
    global.Date = RealDate
  })

  test('getToday', () => {
    mockDate('2021-01-01T12:00:00z')
    const today = api.getToday()
    expect(today).toBe('1-1-2021')
  })
})

test('getUrl', () => {
  const url = api.getUrl('Minha-Data')
  expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27Minha-Data%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {
  const response = {
    data: {
      value: [
        { cotacaoVenda: 3.90 }
      ]
    }
  }

  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2021')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoApi = jest.fn()
  getCotacaoApi.mockResolvedValue(response)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.90)

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao })()
    .then( res => {
      expect(res).toBe(3.90)
    })
})

test('getCotacao', () => {
  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2021')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoApi = jest.fn()
  getCotacaoApi.mockReturnValue(Promise.reject('error'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.90)

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoApi, extractCotacao })()
    .then( res => {
      expect(res).toBe('')
    })
})
