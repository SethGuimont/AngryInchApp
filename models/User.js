/*
Nathan Bishop

Class for isolating user schema and model.
 */

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: String,
    fourDigitCode: String
});

var User = mongoose.model('Users', userSchema);

module.exports = User;