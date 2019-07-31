var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var express = require('express');
var LocalStrategy = require('passport-local').Strategy

app.post('/login', passport.authenticate('local', { successRedirect: 'AdminPortal.html',
    failureRedirect: '/login' }));


app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
    });



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