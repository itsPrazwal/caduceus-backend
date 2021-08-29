const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerEventDelete, 
  controllerEventInsert, 
  controllerEventUpdate, 
  controllerEventsGetAll, 
  controllerEventsGetAllDeleted, 
  controllerEventsGetById
} =  require('./event.controller');

router
  .route("/")
  .get(controllerEventsGetAll)
  .post(authenticate, authorize, controllerEventInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerEventsGetAllDeleted);

router
  .route("/:id")
  .get(controllerEventsGetById)
  .put(authenticate, authorize, controllerEventUpdate)
  .delete(authenticate, authorize, controllerEventDelete);

module.exports = router;
