'use strict';
const async = require("async");
const nodemailer = require("nodemailer");

// Mails to send
const listofemails = ["vrdragicevic@uc.cl","jecastro1@uc.cl"]; 

// Change the user and pass
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '@gmail.com',
    pass: ''
  }
});

const mailOptions = (to) => {
  return {
    from: '"Gavin Belson" <boss@hooli.com>',
    to,
    subject: 'Making the world a better place',
    text: 'Join Hooli now!',
    html: '<b>Join Hooli now!</b>'
  };
};

/* Send all emails simultaneously with async.parallel */

const sendEmails = () => {
  async.parallel(
    listofemails.map(email => (callback) => sendEmail(email, callback)),
    (err, results) => {
      if (err) {
        console.log('Sending email to ' + err + ' failed.');
      } else {
        results.forEach(emails => {
          console.log('Sending email to ' + email + 'succeded!');
        });
      }
    }
  );
}

// This will be called for each email in the list
const sendEmail = (email, callback) => {
	console.log("Sending email to " + email);
  transporter.sendMail(mailOptions(email), (error, info) => {				
    let status;
    if(error) {
      // console.log(error)
      callback(email, null);
    } else {
      callback(null, email);
    }
  });
}

sendEmails();

