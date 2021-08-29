const userModel = require("../models/user.model");
const passwordHash = require("password-hash");

function changePassword(req, res, next) {
  if(req.verified){
    const { newPassword } = req.body;
    if(newPassword){
      userModel.findById(req.userId).exec(function (err, user) {
        if (err) {
          return next(err);
        }
        user.password = passwordHash.generate(newPassword);
        user.save(function (err, saved) {
          if (err) {
            return next(err);
          }
          res.status(200).json("Password changed successfully");
        });
      });
    }
  }
}

module.exports = changePassword;
