//here query db
const connection = require('../utils/db');


function getStockList(sql) {
    let res = connection.queryAsync(sql);
    return res
}

module.exports = {
    getStockList
}