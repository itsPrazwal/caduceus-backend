const userModel = require("./models/user.model");
const mapUser = require("./models/mapUser");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../../config");

function findUser() {
  return userModel.find();
}

function findOneUser(data) {
  return userModel.findOne(data, {isVerified: 1, emailId: 1, userType: 1, fullName: 1, gender: 1, dob: 1, phoneNumber: 1, bio: 1, address: 1, bloodGroup: 1});
}

function findUsersByUserType(userType) {
  return userModel.find({ userType }, { emailId: 1, fullName: 1, gender: 1, dob: 1, phoneNumber: 1, bio: 1, address: 1, bloodGroup: 1});
}

function findExistingUser(data) {
  return userModel.find(data, {isVerified: 1, emailId: 1, userType: 1, fullName: 1});
}

function insertUser(data) {
  let newUser = new userModel(data);
  let mappedUser = mapUser(newUser, data);
  mappedUser.password = passwordHash.generate(data.password);
  return mappedUser.save();
}

function verifyUser({ otpCode, emailId }){
  return new Promise(function (resolve, reject) {
    if(!otpCode){
      return reject({message: 'OTP code not found'})
    }
    userModel.findOne({ emailId }).exec(function(err, user){
      if (!user) {
        return reject({ message: "User not found." });
      }
      if(!user.otpCode){
        return reject({message: 'User verification request invalid.'})
      }
      if (Date.now() > new Date(user.otpCodeExpiry).getTime()) {
        return reject({ message: "OTP Code verification time expired." });
      }
      if(user.otpCode !== otpCode){
        return reject({ message: 'Invalid OTP Code.' })
      }
      user.otpCodeExpiry = null;
      user.otpCode = null;
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
          const jwtObject = {
            id: user._id,
            emailId: user.emailId,
            fullName: user.fullName,
            userType: user.userType,
            isVerified: user.isVerified
          }
          let token = jwt.sign(jwtObject, jwtSecret, {
            expiresIn: "21600000"
          });
          const {id: _id, ...restObject} = jwtObject
          return resolve({
            _id,
            ...restObject,
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
            status: 400,
          });
        }
        resolve(done);
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
  findUsersByUserType,
};
