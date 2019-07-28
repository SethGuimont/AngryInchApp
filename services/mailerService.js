var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'blueskygroup@gmail.com',
        pass: 'BlueSky!1'
    }
});

var mailOptions = {
    from: 'blueskygroup@gmail.com',
    to: 'UsersEmail@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});