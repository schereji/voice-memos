var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect('mongodb://heroku_jp4tjvlj:ugfod4op0ur32gnq331l6lh12u@ds113749.mlab.com:13749/heroku_jp4tjvlj');
app.use('/', router);

module.exports=app;
