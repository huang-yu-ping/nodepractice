const axios = require('axios');
const fs = require('fs');

fs.readFile('stock.txt', 'utf8', (err, data) => {
   if(err) {
       return console.error(err);
   }
   console.log(data);
   let stockCode = data;
   axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210528&stockNo=${stockCode}&_=1622187642107`).then(function(res) {
    console.log(res);
    if(res.data.stat === 'OK') {
        console.log(res.data.date);
        console.log(res.data.title);
    }
  })
})