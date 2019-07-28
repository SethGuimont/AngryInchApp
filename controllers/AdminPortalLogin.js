
// Seth Guimont
// This code below is to simply test referencing the javascript in the html file
// This will be commented out as we add returning Users from Mongodb
var attempt = 100; // Variable to count number of attempts.
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