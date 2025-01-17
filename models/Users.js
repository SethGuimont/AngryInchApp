mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    email: String,
    fourDigitCode: String
});

const User = mongoose.model('Users', userSchema);

module.exports = User;

//users