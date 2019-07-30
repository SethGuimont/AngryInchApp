var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Code = require('../models/Codes');
var emailService = require('../services/mailerService');

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
    var fullCode = fourDigitCode + lastFourDigits;

    const newCode = Code({fourDigitCode: fourDigitCode, lastFourDigits: lastFourDigits,
        inviteBody: inviteBody, redeemed: false, fullCode: fullCode});

    newCode.save(function (err, newCode){
        if(err) return console.error(err);
    });

    return res.redirect('AdminPortal.html')
});

router.post('/index', function(req, res){
    console.log(req.body);
    var fourDigitCode = req.body.fourDigitCode;
    var lastFourDigits = req.body.lastFourDigits;

    Code.findOne({fourDigitCode: fourDigitCode, lastFourDigits: lastFourDigits})
});

router.post('/redeem', function(req, res){
    console.log(req.body);
    var code = req.body.code;
    var email = req.body.email;

    var query =  getCode(code);
    query.exec(function(err, code){
        if(err || code.redeemed === true){
            res.redirect('ErrorCode.html');
            return console.log(err);
        }
        var mailOptions = {
            from: 'blueskygroupcapstone@hotmail.com',
            to: email,
            subject: 'Your invited!',
            text: code.inviteBody
        };
        emailService.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
        code.redeemed = true;
        code.save();
        res.redirect('Codes.html');
        });
    });

function getCode(code){
    var query = Code.findOne({fullCode: code});
    return query;
}

module.exports = router;