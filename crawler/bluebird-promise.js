const Promise = require("bluebird");
const axios = require('axios');
const fs = require('fs');
const readFileBlue = Promise.promisify(fs.readFile);

const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

month = month < 10 ?  "0" + month : month;
date = date < 10 ? "0" + date : date;

let today = year + month + date;



readFileBlue('stock.txt', 'utf-8')
  .then((data) => {
    return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
      params: {
        response: "json",
        date: today,
        stockNo: data,
      }
    })
    .then(function(res) {
      console.log(res);
      if (res.data.stat === 'OK') {
          console.log(res.data.date);
          console.log(res.data.title);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  })