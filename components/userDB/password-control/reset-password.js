const userModel = require("../models/user.model");
const passwordHash = require("password-hash");

function resetPassword(req, res, next) {
  userModel.findOne({ emailId: req.body.emailId }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user || !user.otpCode || !user.otpCodeExpiry) {
      return next({ message: "Password reset request invalid" });
    }
    if (Date.now() > new Date(user.otpCodeExpiry).getTime()) {
      return next({ message: "Password reset time expired." });
    }
    if(!user.password){
      return next({ message: 'Incorrect request on changing password.' })
    }
    if(user.otpCode !== req.body.otpCode){
      return next({ message: 'Invalid OTP Code' })
    }
    user.otpCodeExpiry = null;
    user.otpCode = null;
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
