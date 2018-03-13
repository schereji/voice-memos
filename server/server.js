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
mongoose.connect('mongodb://admin:admin@ds257848.mlab.com:57848/voice_memo');
app.use('/', router);

module.exports=app;
