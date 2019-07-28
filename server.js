//load express and start app
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const eventRoute = require('./routes/event');
const session = require('express-session');

mongoose.connect('mongodb+srv://Admin:Admin@cluster0-udtsj.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB database connected");
});

//Middleware
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public/')));
app.use(session({secret: 'taco bell'}));

app.use('/', userRoute);
app.listen(3000, () => {
    console.log('Express server started at port :3000')
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
