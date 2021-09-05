const userModel = require("../models/user.model");
const passwordHash = require("password-hash");

function resetPassword(req, res, next) {
  userModel.findOne({ emailId: req.body.emailId, token: req.body.otp }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({ message: "Password reset request invalid" });
    }
    if (Date.now() > new Date(user.resetExpiry).getTime()) {
      return next({ message: "Password reset time expired." });
    }
    if(!user.password){
      return next({message: 'Incorrect request on changing password.'})
    }
    user.tokenExpiry = null;
    user.token = null;
      user.password = passwordHash.generate(req.body.password);
      user.save(function (err, done) {
        if (err) {
          return next(err);
        }
        res.status(200).json("Password reset successfully.");
      });
  });
}

module.exports = resetPassword;
