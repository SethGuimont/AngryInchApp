var mongoserv = require('./MongoConnection.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var UserSchema = mongoose.Schema;



var UserSchema = new mongoose.Schema({
    firstName: { type: String,  required: [true, 'Full name must be provided'] },
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

var User = mongoose.model('users', UserSchema);

function validateUser(firstName, email, passsword, fourDigitCode) {
    if(firstname != null && validateEmail(email) == true && password != null && fourDigitCode != null){
        return true
    }
    return false;
}
var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re.test(email)
};

function userSignup(firstName, email, passsword, fourDigitCode){

    if(validateUser(firstName, email, passsword, fourDigitCode)) {
        var newUser = new User({firstName: firstName, email: email, password: passsword, fourDigitCode: fourDigitCode})
        newUser.save(function (err, newUser){
            if(err) return console.error(err);
        })
    }
}

export function findUser(fourDigitCode) {
    users.findOne({'fourDigitCode': fourDigitCode}, 'fourDigitCode', function (err, users) {
        if(err) return false;
        return true;
    })
}
