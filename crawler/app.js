const axios = require('axios');

axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210528&stockNo=2330&_=1622187642107').then(function(res) {
    console.log(res);
    if(res.data.stat === 'OK') {
        console.log(res.data.date);
        console.log(res.data.title);
    }
})