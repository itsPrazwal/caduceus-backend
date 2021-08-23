const userModel = require("./models/userModel");
const mapUser = require("./models/map_user");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../../config");
const randomSt = require("randomstring");

function findUser() {
  return userModel.find();
}

function findOneUser(data) {
  return userModel.findOne(data, {isVerified: 1, emailId: 1, userType: 1});
}

function findExistingUser(data) {
  return userModel.find(data, {isVerified: 1, emailId: 1, userType: 1});
}

function insertUser(data) {
  let newUser = new userModel(data);
  let mappedUser = mapUser(newUser, data);
  mappedUser.password = passwordHash.generate(data.password);
  return mappedUser.save();
}

function verifyUser(verifyToken){
  return new Promise(function (resolve, reject) {
    if(!verifyToken){
      reject({message: 'Verification token not found'})
    }
    userModel.findOne({token: verifyToken}).exec(function(err, user){
      if (!user) {
        reject({ message: "User verification request invalid." });
      }
      if (Date.now() > new Date(user.resetExpiry).getTime()) {
        reject({ message: "User verification time expired." });
      }
      user.tokenExpiry = null;
      user.token = null;
      user.isVerified = true;
      user.save(function (err, done) {
        if (err) {
          reject(err);
        }
        resolve({
          message: "User has been verified successfully.",
          status: 200,
        });
      });
    });
  });
}

function loginUser(emailId, password) {
  return new Promise(function (resolve, reject) {
    userModel
      .findOne({ $or: [{ emailId: emailId, deleted: false }] })
      .then(function (user) {
        if (passwordHash.verify(password, user.password)) {
          let token = jwt.sign({ id: user._id, emailId: user.emailId, isVerified: user.isVerified }, jwtSecret, {
            expiresIn: "21600000"
          });
          return resolve({
            id: user._id,
            emailId: user.emailId,
            token,
          });
        } else {
          reject({ message: "Username or Password is Incorrect!!!", status: 401 });
        }
      })
      .catch(function (err) {
        reject({ message: "Username or Password is Incorrect!!!", status: 401 });
      });
  });
}

function updateUser(id, data) {
  return new Promise(function (resolve, reject) {
    userModel.findById(id).then(function (user) {
      let mappedUser = mapUser(user, data);
      mappedUser.save(function (err, done) {
        if (err) {
          return reject({
            message: "User Update Failure",
            statue: 400,
          });
        }
        resolve({
          message: "User Updated Successfully",
          status: 200,
        });
      });
    });
  });
}

module.exports = {
  findExistingUser,
  findOneUser,
  findUser,
  insertUser,
  loginUser,
  updateUser,
  verifyUser,
};
