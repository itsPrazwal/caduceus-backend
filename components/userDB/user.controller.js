const userQuery = require("./user.query");
const randomSt = require("randomstring");
const { sender } = require('../../config/mailer');

function prepareMail(data) {
  return (mailContent = {
    from: "Caduceus <noreply@caduceus.com>",
    to: data.emailId,
    subject: "Email Verification",
    html: `<p>Hello sir/ma'am,</p>
        <p>Thank you for joining with us.</p>
        </br>
        <p>Please click the link below to verify your email address.</p>
        </br>
        <p><a href='${data.link}'>Verify</a></p>
        <p>This link will expire in 24 hours and can be used only once.</p>
        </br>
        <p>If you didn't request this mail, please ignore and delete this message.</p>
        <p>Thank You</p>
        <p>Caduceus Pvt. Ltd.</p>`,
  });
}

function insertUser(req, res, next) {
  const verifyToken = randomSt.generate(30);
  const verifyExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
  userQuery.findExistingUser({emailId: req.body.emailId})
  .then(function (data){
    data.length ?
    res.status(400).json('User already existed.')
    : userQuery
    .insertUser({...req.body, token: verifyToken, tokenExpiry: verifyExpiry})
    .then(function (data) {
      let mailData = {
        emailId: data.emailId,
        link: `${req.headers.origin}/auth/verify-user/${verifyToken}`,
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

function updateUser(req, res, next) {
  const {emailId, ...rest} = req.body
  userQuery
    .updateUser({ _id: req.userId }, {...rest})
    .then(function (data) {
      res.status(data.status).json(data.message);
    })
    .catch(function (err) {
      next(err);
    });
}

function verifyUser(req, res, next) {
  userQuery
    .verifyUser(req.params.verifyToken)
    .then(function (data){
      res.status(data.status).json(data.message);
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
};
