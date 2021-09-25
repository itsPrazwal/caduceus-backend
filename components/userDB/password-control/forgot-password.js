const userQuery = require("../user.query");
const randomSt = require("randomstring");
const { sender } = require('../../../config/mailer');
const { prepareMail } = require('../../../utils/prepareOtpMail')
const { generateOTPCode } = require('../../../utils/generateOTPCode')

function forgotPassword(req, res, next) {
  userQuery
    .findOneUser({emailId: req.body.emailId})
    .then(function (user) {
      if (user) {
        const { expiry, otp } = generateOTPCode()
        let mailData = {
          fullName: user.fullName,
          emailId: user.emailId,
          otpCode: otp,
        };
        userQuery
          .updateUser(user._id, { otpCodeExpiry: expiry, otpCode: otp })
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
