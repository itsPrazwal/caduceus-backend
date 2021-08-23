const router = require('express').Router();

const userRoute = require('./components/userDB/user.route');
const diseaseRoute = require('./components/diseaseDB/disease.route');

router.use("/user", userRoute);
router.use("/disease", diseaseRoute )

module.exports =  router;
