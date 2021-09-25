const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerDoctorDelete, 
  controllerDoctorInsert, 
  controllerDoctorUpdate, 
  controllerDoctorsGetAll, 
  controllerDoctorsGetAllDeleted, 
  controllerDoctorsGetById,
  controllerDoctorsGetByUserId,
} =  require('./doctor.controller');

router
  .route("/")
  .get(controllerDoctorsGetAll)
  .post(authenticate, authorize, controllerDoctorInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerDoctorsGetAllDeleted);

router
  .route('/user/:userId')
  .get(authenticate, authorize, controllerDoctorsGetByUserId);

router
  .route("/:id")
  .get(controllerDoctorsGetById)
  .put(authenticate, authorize, controllerDoctorUpdate)
  .delete(authenticate, authorize, controllerDoctorDelete);

module.exports = router;
