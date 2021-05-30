const axios = require('axios');
const fs = require('fs');


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
    return axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210528&stockNo=${data}&_=1622187642107`).then(function (res) {
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