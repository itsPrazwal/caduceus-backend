const userQuery = require("../user.query");
const randomSt = require("randomstring");
const {sender} = require('../../../config/mailer');

function prepareMail({fullName, emailId, OTP}) {
  return (mailContent = {
    from: "Caduceus <noreply@caduceus.com>",
    to: emailId,
    subject: "Forgot Password",
    html: `<p>Hi, <strong>${fullName}</strong></p>
        <p>We have received a request that you want to reset your password.</p>
        </br>
        <h5>Kindly, use the following OTP code to reset the password.</h5>
        <h2>${OTP}</h2>
        <p>This OTP code will expire in 24 hours and can be used only once.</p>
        </br>
        <p>If you didn't request this mail, please ignore and delete this message.</p>
        <p>Thank You</p>
        <p>Caduceus Nepal Pvt. Ltd.</p>`,
  });
}

function forgotPassword(req, res, next) {
  userQuery
    .findOneUser({emailId: req.body.emailId})
    .then(function (user) {
      if (user) {
        const resetOTP = Math.random().toString().split('.')[1].slice(0,6);
        const resetExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
        let mailData = {
          fullName: user.fullName,
          emailId: user.emailId,
          OTP: resetOTP,
        };
        userQuery
          .updateUser(user._id, { tokenExpiry: resetExpiry, token: resetOTP })
          .then(function (data) {
            sender.sendMail(prepareMail(mailData), function (err, done) {
              if (err) {
                return next({
                  status: 400,
                  message: "Email Sending Failure",
                  err,
                });
              }
              res.status(200).json({
                message: "OTP Code has been sent to the provided mail ID."
              });
            });
          })
          .catch(function (err) {
            next(err);
          });
      } else {
        next({
          status: 404,
          message: "Email Address not registered.",
        });
      }
    })
    .catch(function (err) {
      next(err);
    });
}

module.exports = forgotPassword;
