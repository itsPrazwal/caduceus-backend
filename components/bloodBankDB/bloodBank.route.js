const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerBloodBankDelete, 
  controllerBloodBankInsert, 
  controllerBloodBankUpdate, 
  controllerBloodBanksGetAll, 
  controllerBloodBanksGetAllDeleted, 
  controllerBloodBanksGetById
} =  require('./bloodBank.controller');

router
  .route("/")
  .get(controllerBloodBanksGetAll)
  .post(authenticate, authorize, controllerBloodBankInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerBloodBanksGetAllDeleted);

router
  .route("/:id")
  .get(controllerBloodBanksGetById)
  .put(authenticate, authorize, controllerBloodBankUpdate)
  .delete(authenticate, authorize, controllerBloodBankDelete);

module.exports = router;
