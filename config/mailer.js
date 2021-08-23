const nodemailer = require('nodemailer');

const MAIL_GMAIL_USER="site.testbypz@gmail.com";
const MAIL_GMAIL_PASS="o4ij2/Er23.42";

const sender = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: MAIL_GMAIL_USER,
      pass: MAIL_GMAIL_PASS,
    },
});

module.exports = { sender }