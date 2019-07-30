var nodemailer = require('nodemailer');
var express = require('express');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'blueskygroupcapstone@hotmail.com',
        pass: 'BlueSky!1'
    }
});
module.exports = transporter;