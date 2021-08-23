const userModel = require("../models/userModel");
const passwordHash = require("password-hash");

function verifyPassword(req, res, next) {
  const {prevPassword: passwordToVerify} = req.body
  if(!passwordToVerify){
    return next({
      status: 403,
      message: "Please provide password to verify."
    })
  }
  userModel.findById(req.userId).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    let isMatched = passwordHash.verify(passwordToVerify, user.password);
    if (!isMatched) {
      return next({ message: "Password verification Failure." });
    } else {
      if(req.body.newPassword){
        req.verified = true;
        next();
      }
      else{
      res.status(200).json("Password verified successfully.");
      }
    }
  });
}

module.exports = verifyPassword;
