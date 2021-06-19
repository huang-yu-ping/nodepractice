var log4js = require('log4js');
//配置
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger('cheese');
logger.level = 'debug';
//-----------------------------------------------
const connection = require('../utils/db');



const showIndex = (req, res) => {
    res.render('index')
  }
const showAbout =  (req, res) => {
    res.render('about');
  }

const stockList = async (req, res) => {
    let stocks = await connection.queryAsync("SELECT * FROM stock");
    //logger.debug(stocks)
    res.render('stock/list', {
      stocks
    })
  }

const  stockInfo = async (req, res) => {
  //res.send(req.params.stockCode)
  let resultInfo = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode);
  res.render('stock/detail', {
    resultInfo
  })

}

module.exports = {
    showIndex,
    showAbout,
    stockList,
    stockInfo
}