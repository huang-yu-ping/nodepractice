const express = require('express');
const http = require('http');
const path = require('path');

const router = require('./routes/router');


const app = express();
http.createServer(app);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './public/')))

app.use(router);

app.listen('3000', function() {
    console.log('running...');
})
//