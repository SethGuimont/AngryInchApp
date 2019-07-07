var mongoserv = require('./MongoConnection.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var UserSchema = mongoose.Schema;

var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re.test(email)
};

var UserSchema = new mongoose.Schema({
    fname: { type: String,  required: [true, 'Full name must be provided'] },
    email: {

        type: String,
        Required: 'Email address cannot be left blank.',

        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        index: {unique: true, dropDups: true}
    },


    password: { type: String , required: [true,  'Password cannot be left blank']},

    fourDigitCode: {type: String, required: [true, 'Four digit code is required for events']}

});

module.exports = mongoose.model('users', UserSchema);