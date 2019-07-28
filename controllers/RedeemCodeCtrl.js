// RedeemCodeCtrl.js
// Authored by Nathan Bishop

var mongoserv = require('./DB.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


/* Seth Guimont
// This code below is to simply test referencing the javascript in the html file
// This will be commented out as we add returning Users from Mongodb
var attempt = 100; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
    var RedeemCode = document.getElementById("RedeemCode").value;
    var CodeEmail = document.getElementById("CodeEmail").value;
    if ( RedeemCode == "code" && CodeEmail == "email")  {
        alert ("checking for valid code");
        window.location = "Codes.html"; // Redirecting to other page.
        return false;
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
// Disabling fields after 100 attempts.
        if( attempt == 0){
            document.getElementById("RedeemCode").disabled = true;
            document.getElementById("CodeEmail").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}*/

