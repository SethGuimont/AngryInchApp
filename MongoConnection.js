var express = require('express');
var app = express();
const mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});