var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Code = require('../models/Codes');
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

    const newUser = User({username: username, password: password, email: email, fourDigitCode: fourDigitCode});
    newUser.save(function (err, newUser){
        if(err) return console.error(err);
    });

    return res.redirect('users.html')
});

router.post('/events', function(req, res) {
    console.log(req.body);
    var fourDigitCode = req.body.fourDigitCode;
    var inviteBody = req.body.inviteBody;
    codeGeneratorService(req.body.NumberOfInvites, fourDigitCode, inviteBody);
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

router.post('/support', function(req, res){
    console.log(req.body);
    userEmail = req.body.SupportEmail;
    eventName = req.body.EventName;
    userText = userEmail + "                " + eventName + "                " + req.body.IssueBody;


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







function getCode(code){
    var query = Code.findOne({fullCode: code});
    return query;
}






// Passport
router.use(passport.initialize());
router.use(passport.session());

router.get('/success', (req, res) => res.send("AdminPortal.html"));
router.get('/error', (req, res) => res.send("error logging in"));

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

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
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
