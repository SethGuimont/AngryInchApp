mongoose = require('mongoose');

var codeSchema = new mongoose.Schema({
    fourDigitCode: {type: String, unique: true, required: true},
    lastFourDigits: {type: String, unique: true, required: true},
    inviteBody: {type: String, unique: false},
    redeemed: {type: Boolean, unique: false}
});

const Code = mongoose.model('Codes', codeSchema);

module.exports = Code;
