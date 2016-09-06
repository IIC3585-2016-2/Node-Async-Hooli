'use strict';
const Promise = require("promise");
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

const sendEmails = () => {
  const emailPromises = listofemails.map(email => sendEmail(email));
  Promise.all(emailPromises)
    .then(emails => emails.forEach(email => console.log('Sending email to ' + email + ' succeded!')))
    .catch(failedEmail => console.log('Sending email to ' + email + ' failed.'));

}

// Return a promise that sends emails.
const sendEmail = (email) => {
  return new Promise((fulfill, reject) => {
    console.log("Sending email to " + email);
    transporter.sendMail(mailOptions(email), (error, info) => {				
      let status;
      if(error) {
        //console.log(error);
        reject(email);
      } else {
        fulfill(email);
      }
    });
  });
}

sendEmails(); // Send all mails

