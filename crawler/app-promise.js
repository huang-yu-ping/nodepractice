const axios = require('axios');
const fs = require('fs');


const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

month = month < 10 ?  "0" + month : month;
date = date < 10 ? "0" + date : date;

let today = year + month + date;

console.log(today);


function readStock() {
  return new Promise(function(res, rej) {
    fs.readFile('stock.txt', function(err, data) {
      if (err) {
        rej(err);
      } else {
        res(data.toString());
      }
    })
  })
}

readStock()
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
  })
  
    
 




/*axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210528&stockNo=2330&_=1622187642107`).then(function(res) {
    console.log(res);
    if(res.data.stat === 'OK') {
        console.log(res.data.date);
        console.log(res.data.title);
    }
})*/