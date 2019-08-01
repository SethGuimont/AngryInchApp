var User = require('../models/Users');

exports.saveUser = function (username, password, email, fourDigitCode) {
    var newUser = new User();

    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.fourDigitCode = fourDigitCode;

    newUser.save(function (err, savedUser){
        if(err) return console.error(err);
    });

    console.log("got here");
}