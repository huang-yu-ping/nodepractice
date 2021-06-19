//here query db
const connection = require('../utils/db');


async function getStockList(sql) {
    try {
        let res = await connection.queryAsync(sql);
        return res
    } catch (err) {
         console.log('資料庫失敗')
    }
    
}


module.exports = {
    getStockList
}