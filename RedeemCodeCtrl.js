// RedeemCodeCtrl.js
// Authored by Nathan Bishop

var mongoserv = require('./MongoConnection.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
