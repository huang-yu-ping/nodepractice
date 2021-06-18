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

module.exports = {
    showIndex,
    showAbout,
    stockList
}