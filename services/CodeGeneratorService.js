var express = require('express');
var Code = require('../models/Codes');

function generateCodes(amountOfCodes, fourDigitCode, inviteBody){
    var codeArray= [];
    for(var i = 0; i < amountOfCodes; i++){
        var fullCode = fourDigitCode + i;
        console.log(inviteBody);
        const newCode = Code({fourDigitCode: fourDigitCode, lastFourDigits: i,
            inviteBody: inviteBody, redeemed: false, fullCode: fullCode});
        codeArray[i] = fourDigitCode + i;
        newCode.save(function (err, newCode){
            if(err) return console.error(err);
        });
    }
    return codeArray;
}

module.exports = generateCodes;