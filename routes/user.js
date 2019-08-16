var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Code = require('../models/Codes');
const bcrypt = require('bcryptjs');
var emailService = require('../services/mailerService');
var codeGeneratorService = require('../services/CodeGeneratorService');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/users', function(req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fourDigitCode = req.body.fourDigitCode;
    var confirmPW = req.body.confirmPW;

    var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    var userFound = false;
    var waitForResults = true;

    var badBool = regex.test(password);
    console.log(badBool);
    if(!badBool){
        return res.redirect('UserSignupFail.html');
    }

    if(!username || !email || !password || !fourDigitCode || !confirmPW){
        return res.redirect('UserSignupFail.html');
    }

    if(password != confirmPW){
        return res.redirect('UserSignupFail.html');
    }

    if(password.length < 6){
        return res.redirect('UserSignupFail.html');
    }

    var newUser = User({username: username, password: password, email: email, fourDigitCode: fourDigitCode});

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;

            newUser.save(function (err, newUser){
                if(err) return console.error(err);
            });
            return res.redirect('UserSignupPass.html')
        })
    });
});

router.post('/events', function(req, res) {
    console.log(req.body);
    var fourDigitCode = req.body.fourDigitCode;
    var inviteBody = req.body.inviteBody;
    var codeEmailBody = '';
    var eventName = req.body.EventName;
    var codeArray = codeGeneratorService(req.body.NumberOfInvites, fourDigitCode, inviteBody);
    for (var i = 0; i < codeArray.length; i++){
        codeEmailBody = codeArray[i] +'\n' + codeEmailBody ;
    }
    var userEmail = getUser(fourDigitCode);
    userEmail.exec(function (err, user) {
        if(err){
            res.redirect('ErrorCode.html');
            return console.log(err);
        }
        var mailOptions = {
            from: 'blueskygroupcapstone@hotmail.com',
            to: user.email,
            subject: 'Your codes for ' + eventName +  '!',
            text: codeEmailBody
        };
        emailService.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.redirect('ErrorCode')
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('Codes')
            }
        });
    });

    return res.redirect('Codes.html')
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

    if(code === null || email === null){
        res.redirect('ErrorCode.html');
    }
    var query =  getCode(code);
    query.exec(function(err, code){
        if(err || code === null || code.redeemed === true){
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

router.post('/support', function(req, res){
    console.log(req.body);
    userEmail = req.body.SupportEmail;
    eventName = req.body.EventName;
    userText = userEmail + "\n" + eventName + "\n" + req.body.IssueBody;


    var mailOptions = {
        from: 'blueskygroupcapstone@hotmail.com',
        to: 'blueskygroupcapstone@hotmail.com',
        subject: 'Support Request',
        text: userText
    };

    emailService.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.redirect('ErrorCode.html');
        } else {
            res.redirect('SupportSuccessCode.html');
            console.log('Email sent: ' + info.response);
        }
    });
});




function getUser(fourDigitCode){
    var query = User.findOne({fourDigitCode: fourDigitCode});
    return query;
}


function getCode(code){
    var query = Code.findOne({fullCode: code});
    return query;
}


// Passport
router.use(passport.initialize());
router.use(passport.session());

router.get('/success', (req, res) => res.send("AdminPortal.html"));
router.get('/error', (req, res) => res.redirect("ErrorLogin.html"));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false)
                }
            });
        });
    }
));

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('AdminPortal.html');
    });

module.exports = router;


// all working
