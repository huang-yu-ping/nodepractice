const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './public/')))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about');
})

app.listen('3000', function() {
    console.log('running...');
})
