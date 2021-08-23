const router = require("express").Router();

const userRoute = require("./components/userControl/user.route");

router.use("/user", userRoute);

module.exports = router;
