const router = require('express').Router();

const userRoute = require('./components/userDB/user.route');
const diseaseRoute = require('./components/diseaseDB/disease.route');
const departmentRoute = require('./components/departmentDB/department.route');

router.use("/user", userRoute);
router.use("/disease", diseaseRoute );
router.use("/department", departmentRoute );

module.exports =  router;
