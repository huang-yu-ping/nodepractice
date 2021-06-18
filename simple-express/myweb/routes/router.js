var express = require('express');
var router = express.Router();
const controllers = require('../controllers/mainctrl')
/* GET home page. */
router.get('/', controllers.showIndex);

router.get('/about', controllers.showAbout)

router.get('/stock', controllers.stockList)

module.exports = router;
