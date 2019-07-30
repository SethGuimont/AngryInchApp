var express = require('express');
var Code = require('../models/Codes');

function generateCodes(amountOfCodes, fourDigitCode, inviteBody){
    for(var i = 0; i < amountOfCodes; i++){
        var fullCode = fourDigitCode + i;
        const newCode = Code({fourDigitCode: fourDigitCode, lastFourDigits: i,
            inviteBody: inviteBody, redeemed: false, fullCode: fullCode});

        newCode.save(function (err, newCode){
            if(err) return console.error(err);
        });
    }
}

module.exports = generateCodes;