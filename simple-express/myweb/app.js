const express = require('express');
const path = require('path');

const connection = require('./utils/db');

var log4js = require('log4js');


//配置
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger('cheese');
logger.level = 'debug';


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './public/')))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/stock', async (req, res) => {
  let stocks = await connection.queryAsync("SELECT * FROM stock");
  //logger.debug(stocks)
  res.render('stock/list', {
    stocks
  })
})

app.listen('3000', function() {
    console.log('running...');
})
