const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerDepartmentDelete, 
  controllerDepartmentInsert, 
  controllerDepartmentUpdate, 
  controllerDepartmentsGetAll, 
  controllerDepartmentsGetAllDeleted, 
  controllerDepartmentsGetById
} =  require('./department.controller');

router
  .route("/")
  .get(controllerDepartmentsGetAll)
  .post(authenticate, authorize, controllerDepartmentInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerDepartmentsGetAllDeleted);

router
  .route("/:id")
  .get(controllerDepartmentsGetById)
  .put(authenticate, authorize, controllerDepartmentUpdate)
  .delete(authenticate, authorize, controllerDepartmentDelete);

module.exports = router;
