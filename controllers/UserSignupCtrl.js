// This class is not used yet as of 7/11/2019
const express = require('express');
var router = express.Router();

router.get('/',( req, res) => {
    res.render('Users', { title: express});
})

router.post('/users', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fourDigitCode = req.body.fourDigitCode;

    console.log("US: " + username + " pass: " + password + " email: " + email + " four dig: " + fourDigitCode);
    return res.status(200).send();
});

module.exports = router;