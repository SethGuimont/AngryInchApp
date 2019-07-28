mongoose = require('mongoose');

var codeSchema = new mongoose.Schema({
    fourDigitCode: {type: String, unique: true, required: true},
    lastFourDigits: {type: String, unique: true, required: true},
    event: {type: Event}
});

const Code = mongoose.model('Codes', codeSchema);

module.exports = Code;
