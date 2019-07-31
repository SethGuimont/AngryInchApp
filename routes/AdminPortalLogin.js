
// Seth Guimont
// This code below is to simply test referencing the javascript in the html file
// This will be commented out as we add returning Users from Mongodb
/*var attempt = 100; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "FORM" && password == "FORM"){
        alert ("Login successfully");
        window.location = "AdminPortal.html"; // Redirecting to other page.
        return false;
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
// Disabling fields after 100 attempts.
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("login").disabled = true;
            return false;
        }
    }
}



/*var User = require('Users.js')
const { body, validationResult } = require('express-validator/check');

const express = require('express')::

const router = express.Router();

router.post(
    '/',

    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            res.send('Thank you for your registration!');
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

module.exports = router;*/

// adding this code to play with later
/*var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var express = require('express');
var LocalStrategy = require('passport-local').Strategy

app.post('/AdminPortalLogin', passport.authenticate('local'),
    function(req, res)
    {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

        res.redirect('/users/' + req.user.username);
    });

app.post('/AdminPortalLogin',
    passport.authenticate('local', { successRedirect: 'AdminPortal.html',
        failureRedirect: '/AdminPortalLogin',
        failureFlash: true })
);
passport.use(new LocalStrategy(

    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user)
            {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validPassword(password))
            {

                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, false, { message: 'Incorrect password.' });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



