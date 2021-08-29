const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerPatientDelete, 
  controllerPatientInsert, 
  controllerPatientUpdate, 
  controllerPatientsGetAll, 
  controllerPatientsGetAllDeleted, 
  controllerPatientsGetById
} =  require('./patient.controller');

router
  .route("/")
  .get(controllerPatientsGetAll)
  .post(authenticate, authorize, controllerPatientInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerPatientsGetAllDeleted);

router
  .route("/:id")
  .get(controllerPatientsGetById)
  .put(authenticate, authorize, controllerPatientUpdate)
  .delete(authenticate, authorize, controllerPatientDelete);

module.exports = router;
