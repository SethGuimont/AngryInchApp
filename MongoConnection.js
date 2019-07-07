//import mongoose
var mongoose = require('mongoose');

//my connection
mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
console.log("connected to local mongo server");

