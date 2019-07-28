// CreateEvent.js
// Authored by Nathan Bishop
// not in use as of 7/11/2019, place holder for future improvements



import {generateCodes} from "./GenerateCodesCtrl";

var mongoserv = require('./DB.js')
var mongoose = require('mongoose');
var userSignUpCtrl = require('./routes/UserSignupCtrl')
var userSignupCtrl = new userSignUpCtrl;

mongoose.connect('mongodb+srv://Admin:admin1234@cluster0-arz1z.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var EventSchema = new mongoose.Schema({

    fourDigitCode: {type: String, required: [true, 'Four digit code is required for events']},
    eventCodes: [String],
    eventDescription: String

});

var Event = mongoose.model('event', EventSchema);

function CreateEvent(fourDigitCode, EventDescription){

    if(userSignUpCtrl.findUser(fourDigitCode)){
        var eventCodes = generateCodes(fourDigitCode)
        var newEvent = new Event({fourDigitCode: fourDigitCode, eventCodes: eventCodes, eventDescription: EventDescription});
        newEvent.save(function (err, newEvent){
            if(err) return console.error(err);
        })
    }
}

export function redeemCode(eventCode){
    Event.findOne({'eventCode': eventCode}), 'eventCodes', function (err, Event) {
        if(err) return console.log(err);
    }
}