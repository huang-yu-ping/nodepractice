const express = require('express')
var router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', (req, res) => {
    res.render('post')
})

module.exports = router;