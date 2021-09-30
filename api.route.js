const router = require('express').Router();

const userRoute = require('./components/userDB/user.route');
const diseaseRoute = require('./components/diseaseDB/disease.route');
const departmentRoute = require('./components/departmentDB/department.route');
const ambulanceRoute = require('./components/ambulanceDB/ambulance.route');
const bloodBankRoute = require('./components/bloodBankDB/bloodBank.route');
const bloodDonorRoute = require('./components/bloodDonorDB/bloodDonor.route');
const doctorRoute = require('./components/doctorDB/doctor.route');
const eventRoute = require('./components/eventDB/event.route');
const hospitalRoute = require('./components/hospitalDB/hospital.route');
const patientRoute = require('./components/patientDB/patient.route');
const requestRoute = require('./components/requestDB/request.route');
const ambulanceRequestRoute = require('./components/ambulanceRequestDB/ambulanceRequest.route');

router.use("/user", userRoute);
router.use("/disease", diseaseRoute );
router.use("/department", departmentRoute );
router.use("/ambulance", ambulanceRoute );
router.use("/bloodBank", bloodBankRoute );
router.use("/bloodDonor", bloodDonorRoute );
router.use("/doctor", doctorRoute );
router.use("/event", eventRoute );
router.use("/hospital", hospitalRoute );
router.use("/patient", patientRoute );
router.use("/request", requestRoute );
router.use("/ambulanceRequest", ambulanceRequestRoute)

module.exports =  router;
