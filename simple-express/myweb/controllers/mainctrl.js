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
const models = require('../models/stock');


const showIndex = (req, res) => {
    res.render('index')
  }
const showAbout =  (req, res) => {
    res.render('about');
  }

const stockList = async (req, res) => {
    let stocks = await models.getStockList("SELECT * FROM stock");
    //logger.debug(stocks)
    res.render('stock/list', {
      stocks
    })
  }

const  stockInfo = async (req, res) => {
  //res.send(req.params.stockCode)
  
  let stock = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?;", req.params.stockCode);
  if (stock.length == 0) {
    throw new Error('查無代碼');
  }

  let stockName = stock[0].stock_name;
  let stockId = stock[0].stock_id;
  
  //分頁
  let count = await connection.queryAsync("SELECT COUNT(*) as tatol FROM stock_price WHERE stock_id=?;", req.params.stockCode)
  //logger.debug(count)
  const total = count[0].tatol; //74
  const perPage = 10;
  const allPage = Math.ceil(total / perPage);
  const currPage = req.query.page || 1;
  const showInfoPage = (currPage -1) * perPage;
  

  let resultInfo = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;", [req.params.stockCode, perPage, showInfoPage]);
  
  res.render('stock/detail', {
    resultInfo,
    stockId,
    stockName,
    pagination: {
      allPage,
      currPage,
      total
    }
  })

}

module.exports = {
    showIndex,
    showAbout,
    stockList,
    stockInfo
}