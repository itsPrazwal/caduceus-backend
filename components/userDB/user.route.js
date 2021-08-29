const router = require("express").Router();
const controller = require("./user.controller");
const authenticate = require("../../middlewares/authenticate");
const authorizer = require("../../middlewares/authorize");
const fileUpload = require("../../middlewares/fileHandler").uploadSingleImage();
const forgotPassword = require("./password-control/forgot-password");
const resetPassword = require("./password-control/reset-password");
const changePassword = require("./password-control/change-password");
const verifyPassword = require("./password-control/verify-password");

router
  .route("/register")
  .post(controller.insertUser);

router.route("/login").post(controller.loginUser);

router.route("/verify/:verifyToken").get(controller.verifyUser)

router
  .route("/")
  .get(authenticate, controller.getUser)
  .put(authenticate, authorizer, controller.updateUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").put(resetPassword);

router.route("/verify-password").post(authenticate, verifyPassword);
router.route("/change-password").put(authenticate, verifyPassword, changePassword);

module.exports = router;
