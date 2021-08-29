const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerAmbulanceDelete, 
  controllerAmbulanceInsert, 
  controllerAmbulanceUpdate, 
  controllerAmbulancesGetAll, 
  controllerAmbulancesGetAllDeleted, 
  controllerAmbulancesGetById
} =  require('./ambulance.controller');

router
  .route("/")
  .get(controllerAmbulancesGetAll)
  .post(authenticate, authorize, controllerAmbulanceInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerAmbulancesGetAllDeleted);

router
  .route("/:id")
  .get(controllerAmbulancesGetById)
  .put(authenticate, authorize, controllerAmbulanceUpdate)
  .delete(authenticate, authorize, controllerAmbulanceDelete);

module.exports = router;
