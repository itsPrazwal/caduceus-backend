const userQuery = require("./user.query");
const { sender } = require('../../config/mailer');
const { prepareMail } = require('../../utils/prepareOtpMail')
const { generateOTPCode } = require('../../utils/generateOTPCode');
const { makeResponseObject } = require("../../utils/responder");
const doctorQuery = require("../doctorDB/doctor.query");
const bloodDonorQuery = require("../bloodDonorDB/bloodDonor.query");
const patientQuery = require("../patientDB/patient.query");

function insertUser(req, res, next) {
  const { expiry, otp } = generateOTPCode()
  userQuery.findExistingUser({emailId: req.body.emailId})
    .then(function (data){
      data.length ?
        res.status(400).json('User with provided email already existed.')
        : userQuery
          .insertUser({...req.body, otpCode: otp, otpCodeExpiry: expiry})
          .then(function (data) {
            if(data.userType === 'DOCTOR'){              
              doctorQuery.insertDoctor({ userId: data._id })
            }
            if(data.userType === 'BLOOD_DONOR'){              
              bloodDonorQuery.insertBloodDonor({ userId: data._id })
            }
            if(data.userType === 'PATIENT'){              
              patientQuery.insertPatient({ userId: data._id })
            }
            let mailData = {
              fullName: data.fullName,
              emailId: data.emailId,
              otpCode: otp,
            };
            sender.sendMail(prepareMail(mailData), function (err, done) {
              if (err) {
                return next({
                  status: 400,
                  message: "Email Sending Failure",
                  err,
                });
              }else{
                res.status(200).json("User registered successfully.");
              }
            });
          })
          .catch(function (err) {
            next(err);
          });
    })
    .catch(function (err){
      next(err)
    })
}

function resendOtpCode(req, res, next) {
  const { expiry, otp } = generateOTPCode()
  userQuery.findOneUser({ emailId: req.body.emailId })
  .then(function (user){
    user.length <= 0 ?
    res.status(400).json('User not found.')
    : userQuery
    .updateUser(user._id,{ otpCode: otp, otpCodeExpiry: expiry})
    .then(function (data) {
      let mailData = {
        fullName: user.fullName,
        emailId: user.emailId,
        otpCode: otp,
      };
      console.log('maiL :', mailData)
      sender.sendMail(prepareMail(mailData), function (err, done) {
        if (err) {
          console.log('err: ', err)
          return next({
            status: 400,
            message: "Email re-sending Failure",
            err,
          });
        }else{
          res.status(200).json("Email resent successfully.");
        }
      });
    })
    .catch(function (err) {
      next(err);
    });
  })
  .catch(function (err){
    next(err)
  })
}

function loginUser(req, res, next) {
  userQuery
    .loginUser(req.body.emailId, req.body.password)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      next(err);
    });
}

function getUser(req, res, next) {
  userQuery
    .findOneUser({ _id: req.userId })
    .then(function (user) {
      res.status(200).json(user);
    })
    .catch(function (err) {
      next(err);
    });
}

function getUsersByUserType(req, res, next) {
  userQuery
    .findUsersByUserType(req.params.userType)
    .then(function (user) {
      res.status(200).json(makeResponseObject(user, 'User fetched successfully.'));
    })
    .catch(function (err) {
      next(err);
    });
}

function updateUser(req, res, next) {
  const {emailId, ...rest} = req.body
  userQuery
    .updateUser({ _id: req.userId }, {...rest})
    .then(function (data) {
      console.log('data: ', data)
      res.status(200).json(makeResponseObject(data, 'User updated success'));
    })
    .catch(function (err) {
      next(err);
    });
}

function verifyUser(req, res, next) {
  userQuery
    .verifyUser({ otpCode: req.body.otpCode, emailId: req.body.emailId})
    .then(function (data){
      res.status(200).json(data.message);
    })
    .catch(function(err){
      next(err);
    })
}

module.exports = {
  insertUser,
  updateUser,
  loginUser,
  getUser,
  verifyUser,
  resendOtpCode,
  getUsersByUserType
};
