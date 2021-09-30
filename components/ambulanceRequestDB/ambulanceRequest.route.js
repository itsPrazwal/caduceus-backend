const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerAmbulanceRequestCreate,
  controllerAmbulanceRequestUpdate,
  controllerAmbulanceRequestGetAll
} =  require('./ambulanceRequest.controller');

router
  .route('/')
  .get(authenticate, authorize, controllerAmbulanceRequestGetAll)
  .post(controllerAmbulanceRequestCreate)
  .put(authenticate, authorize, controllerAmbulanceRequestUpdate);  

module.exports = router;
