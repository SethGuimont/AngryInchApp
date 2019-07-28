//Downloaded by Seth Guimont for project

// NPM-Free Server by The Jared Wilcurt
// All you need to run this is an installed copy of Node.JS
// Put this next to the files you want to serve and run: node server.js

// Require in some of the native stuff that comes with Node
/*var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
// Port number to use
var port = process.argv[2] || 8000;
// Colors for CLI output
var WHT = '\033[39m';
var RED = '\033[91m';
var GRN = '\033[32m';

// Create the server
http.createServer(function (request, response) {

    // The requested URL, like http://localhost:8000/file.html => /file.html
    var uri = url.parse(request.url).pathname;
    // get the /file.html from above and then find it from the current folder
    var filename = path.join(process.cwd(), uri);

    // Setting up MIME-Type (YOU MAY NEED TO ADD MORE HERE) <--------
    var contentTypesByExtension = {
        '.html': 'text/html',
        '.css':  'text/css',
        '.js':   'text/javascript',
        '.json': 'text/json',
        '.svg':  'image/svg+xml'
    };

    // Check if the requested file exists
    fs.exists(filename, function (exists) {
        // If it doesn't
        if (!exists) {
            // Output a red error pointing to failed request
            console.log(RED + 'FAIL: ' + filename);
            // Redirect the browser to the 404 page
            filename = path.join(process.cwd(), '/404.html');
            // If the requested URL is a folder, like http://localhost:8000/catpics
        } else if (fs.statSync(filename).isDirectory()) {
            // Output a green line to the console explaining what folder was requested
            console.log(GRN + 'FLDR: ' + WHT + filename);
            // redirect the user to the index.html in the requested folder
            filename += '';
        }

        // Assuming the file exists, read it
        fs.readFile(filename, 'binary', function (err, file) {
            // Output a green line to console explaining the file that will be loaded in the browser
            console.log(GRN + 'FILE: ' + WHT + filename);
            // If there was an error trying to read the file
            if (err) {
                // Put the error in the browser
                response.writeHead(500, {'Content-Type': 'text/html'});
                response.write(err + '\n');
                response.end();
                return;
            }

            // Otherwise, declare a headers object and a var for the MIME-Type
            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            // If the requested file has a matching MIME-Type
            if (contentType) {
                // Set it in the headers
                headers['Content-Type'] = contentType;
            }

            // Output the read file to the browser for it to load
            response.writeHead(200, headers);
            response.write(file, 'binary');
            response.end();
        });

    });

}).listen(parseInt(port, 10));

// Message to display when server is started
console.log(WHT + 'Static file server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');44*/

require('./models/DB');
//load express and start app
const express = require('express');
const userSignupControl = require('./controllers/UserSignupCtrl');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public/')));
app.listen(3000, () => {
    console.log('Express server started at port :3000')
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/users', function(req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var fourDigitCode = req.body.fourDigitCode;

    console.log("US: " + username + " pass: " + password + " email: " + email + " four dig: " + fourDigitCode);
    return res.status(200).send();
});