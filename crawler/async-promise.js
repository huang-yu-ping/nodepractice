const axios = require('axios');
const fs = require('fs/promises');


const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

month = month < 10 ?  "0" + month : month;
date = date < 10 ? "0" + date : date;

let today = year + month + date;

console.log(today);





async function getData() {
    try {
        let code = await fs.readFile('stock.txt', 'utf-8');
        let info = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
            params: {
              response: "json",
              date: today,
              stockNo: code,
            }
          });
        console.log(info.data.title);
    } catch(err) {
        console.log("錯誤", err);
    }
}

getData();