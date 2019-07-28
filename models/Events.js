mongoose = require('mongoose');

//owner is the four digit code
var eventSchema = new mongoose.Schema({
    inviteBody: {type: String, unique: false}
});

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;