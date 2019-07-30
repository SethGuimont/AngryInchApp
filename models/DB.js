// DB.js
// Authored by Seth Guimont, edits by Nathan Bishop

// Code directly below is for testing with hosted mongo db

// var mongoose = require('mongoose');

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
    if (!err) {console.log('MongoDB Connection Open.')}});

require('./User');
// mongoose.connect("mongodb://localhost:27017/MyDb", function (err, db)

// // Code directly below is for local machine testing
// var MongoClient = require('mongodb').MongoClient;
//
// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/users", function (err, db) {
//
//     if(err) throw err;
//
//     //Write databse Insert/Update/Query code here..
//
// });