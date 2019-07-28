var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var Code = require('../models/Codes');

router.post('/users', function(req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fourDigitCode = req.body.fourDigitCode;

    const newUser = User({username: username, password: password, email: email, fourDigitCode: fourDigitCode});
    newUser.save(function (err, newUser){
        if(err) return console.error(err);
    });

    return res.redirect('users.html')
});

router.post('/events', function(req, res) {
    console.log(req.body);
    var fourDigitCode = req.body.fourDigitCode;
    var lastFourDigits = 1234;
    var inviteBody = req.body.inviteBody;

    const newCode = Code({fourDigitCode: fourDigitCode, lastFourDigits: lastFourDigits,
        inviteBody: inviteBody, redeemed: false});

    newCode.save(function (err, newCode){
        if(err) return console.error(err);
    });

    return res.redirect('users.html')
});

router.post('/index', function(req, res){
    console.log(req.body);
    var fourDigitCode = req.body.fourDigitCode;
    var lastFourDigits = req.body.lastFourDigits;

    Code.findOne({fourDigitCode: fourDigitCode, lastFourDigits: lastFourDigits})
});

module.exports = router;