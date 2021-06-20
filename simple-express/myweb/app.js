const express = require('express');
const path = require('path');

const app = express();
const router = require('./routes/router');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './public/')))

app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use(router);



app.use(function(req, res) {
    res.status(404);
    res.render('error');
  })

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
  })



app.listen(3000, function() {
    console.log('running...');
})
//