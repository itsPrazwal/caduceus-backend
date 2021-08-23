const userQuery = require("../userQuery");
const randomSt = require("randomstring");
const {sender} = require('../../../config/mailer');

function prepareMail(data) {
  return (mailContent = {
    from: "Caduceus <noreply@caduceus.com>",
    to: data.emailId,
    subject: "Forgot Password",
    html: `<p>Hi, <strong>${data.fullName}</strong></p>
        <p>We have received a request that you want to reset your password.</p>
        </br>
        <p><a href='${data.link}'>Reset Password >></a></p>
        <p>This link will expire in 24 hours and can be used only once.</p>
        </br>
        <p>If you didn't request this mail, please ignore and delete this message.</p>
        <p>Thank You</p>
        <p>Aura Vacation Pvt. Ltd.</p>`,
  });
}

function forgotPassword(req, res, next) {
  userQuery
    .findOneUser({emailId: req.body.emailId})
    .then(function (user) {
      if (user) {
        const resetToken = randomSt.generate(20);
        const resetExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
        let mailData = {
          fullName: user.fullName,
          emailId: user.emailId,
          link: `${req.headers.origin}/Reset-Password/${resetToken}`,
        };
        userQuery
          .updateUser(user._id, { tokenExpiry: resetExpiry, token: resetToken })
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
                message: "Reset link has been sent to the provided mail ID."
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
