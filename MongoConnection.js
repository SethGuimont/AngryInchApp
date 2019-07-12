// Code directly below is for testing with hosted mongo db

/*
import mongoose
var mongoose = require('mongoose');

my connection
mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/MyDb", function (err, db)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected")
);



*/

// Code directly below is for local machine testing
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/users", function (err, db) {

    if(err) throw err;

    //Write databse Insert/Update/Query code here..

});