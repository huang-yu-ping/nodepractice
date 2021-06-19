var express = require('express');
var router = express.Router();
const connection = require('../utils/db');

router.get('/stocks', async (req, res) => {
    let stocks = await connection.queryAsync("SELECT * FROM stock");
    res.json(stocks)
})

module.exports = router;