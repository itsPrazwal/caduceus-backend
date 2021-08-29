let jwt = require("jsonwebtoken");
let config = require("./../config/index");
let userModel = require("../components/userDB/models/user.model");

module.exports = (req, res, next) => {
  let token;
  if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  } else if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  } else if (req.headers["token"]) {
    token = req.headers["token"];
  } else {
    next({ message: "Token not found" });
  }
  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, logIn) {
      if (err) {
        return next({
          message: err.expiredAt ? 'Login Session Expired': "unauthorized access",
          status: err.expiredAt ? 440 : 401,
        });
      }
      userModel.findById(logIn.id).exec(function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user || user.deleted) {
          return next({
            message: "user removed from system",
          });
        }
        req.userId = user._id;
        req.isVerified = user.isVerified
        next();
      });
    });
  } else {
    next({ message: "Unauthorized Token" });
  }
};
