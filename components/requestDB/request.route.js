const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerRequestGetByUserId,
  controllerRequestUpdate,
  controllerRequestCreate,
  controllerUserGetByRequest,
} =  require('./request.controller');

router
  .route('/')
  .get(authenticate, authorize, controllerRequestGetByUserId)
  .post(authenticate, authorize, controllerRequestCreate)
  .put(authenticate, authorize, controllerRequestUpdate);

router
  .route('/requesters')
  .get(authenticate, authorize, controllerUserGetByRequest)
  

module.exports = router;
