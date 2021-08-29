const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerBloodDonorDelete, 
  controllerBloodDonorInsert, 
  controllerBloodDonorUpdate, 
  controllerBloodDonorsGetAll, 
  controllerBloodDonorsGetAllDeleted, 
  controllerBloodDonorsGetById
} =  require('./bloodDonor.controller');

router
  .route("/")
  .get(controllerBloodDonorsGetAll)
  .post(authenticate, authorize, controllerBloodDonorInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerBloodDonorsGetAllDeleted);

router
  .route("/:id")
  .get(controllerBloodDonorsGetById)
  .put(authenticate, authorize, controllerBloodDonorUpdate)
  .delete(authenticate, authorize, controllerBloodDonorDelete);

module.exports = router;
