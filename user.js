// code taken from https://github.com/DDCSLearning/authenticationIntro/commit/1564715bf713b89bc622adb314577d509eed51ac?diff=split
var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
    var UserSchema = new mongoose.Schema({
        email: {
            email: {
                type: String,
                type: String,
                unique: true,
                unique: true,
                required: true,
                required: true,
                trim: true,
                trim: true,
            },
        },
        username: {
            username: {
                type: String,
                type: String,
                unique: true,
                unique: true,
                required: true,
                required: true,
                trim: true,
                trim: true,
            },
        },
        password: {
            password: {
                type: String,
                type: String,
                required: true,
                required: true,
            },
        },
        passwordConf: {
            passwordConf: {
                type: String,
                type: String,
                required: true,
                required: true,
            }
        }
    });
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}