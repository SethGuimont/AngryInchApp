//var dbconnection = require('../MongoConnection.js');
//var mongoose = require('mongoose');


const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.render('form', { title: 'Registration form' });
});

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

module.exports = router;
