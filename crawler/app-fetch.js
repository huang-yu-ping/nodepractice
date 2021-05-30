const axios = require('axios');
const fs = require('fs');
const fetch = require("node-fetch");

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
    fs.readFile('stock.txt', 'utf8', function(err, data) {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    })
  })
}



async function getData() {
    try {
        let code = await readStock();
        console.log(code);
        let response = await fetch(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${today}&stockNo=${code}&_=1622187642107`);
        if (response) { 
          let json = await response.json();
          console.log(json.title);
        } else {
          alert("HTTP-Error: " + response.status);
        }
    } catch(err) {
        console.log("錯誤", err);
    }
}

getData();