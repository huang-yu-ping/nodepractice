const express = require('express');
const path = require('path');

const router = require('./routes/router');


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './public/')))


app.use(router);

app.listen('3000', function() {
    console.log('running...');
})
//