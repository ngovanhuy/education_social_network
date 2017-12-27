// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// process.env.SENDGRID_API_KEY = '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';
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'abc@gmail.com',
  from: 'esservice@esservice.herokuapp.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
// process.env.SENDGRID_API_KEY = 'sendgrid_api_key_here';
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'abc@gmail.com',
  from: 'esservice@esservice.herokuapp.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);