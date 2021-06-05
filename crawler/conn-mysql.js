const fs = require('fs/promises');
const axios = require('axios');
const mysql = require('mysql');
const Promise = require('bluebird');

//conn mysql
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'z4623033',
    database : 'stock'
});

connection = Promise.promisifyAll(connection);


;(async function stockQuery() {
    try {
        await connection.connectAsync();
        let code = await fs.readFile('stock.txt', 'utf-8');
        let searchRes = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id=${code}`);
        if (searchRes.length <= 0) {
            let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${code}`);
            if (response.data.suggestions.length > 0) {
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
          console.error(err);
      } finally {
          connection.endAsync();
      }
})()



