const fs = require('fs/promises');
const axios = require('axios');
const mysql = require('mysql');
const moment = require("moment");
const Promise = require('bluebird');

require("dotenv").config();

//conn mysql
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    prot: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection = Promise.promisifyAll(connection);


/*;(async function stockQuery() {
    try {
        await connection.connectAsync();
        let code = await fs.readFile('stock.txt', 'utf-8');
        console.log(code);
        let searchRes = await connection.queryAsync(`SELECT * FROM stock WHERE stock_id=?`, [code]);
        console.log(searchRes);
        if (searchRes.length <= 0) {
            let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${code}`);
              console.log(response.data.suggestions)
            if (response.data.suggestions.length > 0) {
              console.log(2)
              let dataArr = response.data.suggestions;
              let oneStock = dataArr
                                 .map((item) => item.split('\t'))
                                 .find((stock) => stock[0] === code);
              await connection.queryAsync(`INSERT INTO stock SET stock_id='${oneStock[0]}',stock_name='${oneStock[1]}'`)
              console.log('insert success');
            }
        } else {
            console.log('已有資料');
        }
      } catch {
          //console.error(err);
          console.log('error')
      } finally {
          connection.endAsync();
      }
})()*/


//`SELECT stock_id FROM stock WHERE stock_id = ${stockNum}`,
fs.readFile('stock.txt', 'utf-8')
  .then((code) => {
    console.log(code);
  return new Promise((resolve, reject) => {
      connection.query(`SELECT stock_id FROM stock WHERE stock_id = ${code}`,
            (err, res) => {
              if(err) {
                throw error;
              } 
              if(res.length === 0) {
                //console.log(res);
                let getData =  axios.get(
                  `https://www.twse.com.tw/zh/api/codeQuery?query=${code}`
               );
               resolve(getData)
              }
              
            }
        );
    })
      
    
   })
    .then(function(res) {
      console.log(res);
      
    })
    .catch((err) => {
      console.error(err);
    })
 



