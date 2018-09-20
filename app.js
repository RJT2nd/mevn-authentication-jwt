var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('./routes/book');
var app = express();

// mongoose
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:password123@ds245082.mlab.com:45082/mevn-secure', { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);

// Authentication
var auth = require('./routes/auth');
app.use('/api/auth', auth);

// catching 404 error
app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// api error handling
app.use(function(err, req, res, next) {
    console.log(err);
    
    if(req.app.get('env') !== 'development') {
        delete err.stack;
    }
    
    res.status(err.statusCode || 500).json(err);
});

module.exports = app;