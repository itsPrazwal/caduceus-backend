const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerHospitalDelete, 
  controllerHospitalInsert, 
  controllerHospitalUpdate, 
  controllerHospitalsGetAll, 
  controllerHospitalsGetAllDeleted, 
  controllerHospitalsGetById
} =  require('./hospital.controller');

router
  .route("/")
  .get(controllerHospitalsGetAll)
  .post(authenticate, authorize, controllerHospitalInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerHospitalsGetAllDeleted);

router
  .route("/:id")
  .get(controllerHospitalsGetById)
  .put(authenticate, authorize, controllerHospitalUpdate)
  .delete(authenticate, authorize, controllerHospitalDelete);

module.exports = router;
