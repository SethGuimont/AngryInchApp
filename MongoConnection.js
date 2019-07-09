//import mongoose
var mongoose = require('mongoose');

//my connection
mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected")
});