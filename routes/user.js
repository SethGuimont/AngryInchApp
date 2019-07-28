var express = require('express');
var router = express.Router();
var User = require('../models/Users');

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

module.exports = router;