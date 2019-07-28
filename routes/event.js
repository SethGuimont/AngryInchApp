var express = require('express');
var router = express.Router();
var Code = require('../models/Codes');

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

module.exports = router;