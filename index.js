const express = require('express');
const path = require('path');

const { convert, toMoney } = require('./lib/convert');
const apiBCB = require('./lib/api.bcb')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (request, response) => {
  const cotacao = await apiBCB.getCotacao()
  response.render('home', {
    cotacao
  });
})

app.get('/cotacao', (request, response) => {
  const { cotacao, quantidade } = request.query;

  if (!cotacao || !quantidade) {
    return response.render('cotacao', {
      error: 'Valores inválidos'
    })
  }

  const conversao = convert(cotacao, quantidade)

  response.render('cotacao', {
    error: false,
    cotacao: toMoney(cotacao),
    quantidade: toMoney(quantidade),
    conversao: toMoney(conversao)
  });
})

app.listen(3000, error => {
  if (error) {
    console.log('Não foi possível iniciar o servidor');
  } else {
    console.log('ConvertMyMoney online');
  }
})
