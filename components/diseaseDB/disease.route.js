const router = require('express').Router();
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

const {
  controllerDiseaseDelete, 
  controllerDiseaseInsert, 
  controllerDiseaseUpdate, 
  controllerDiseasesGetAll, 
  controllerDiseasesGetAllDeleted, 
  controllerDiseasesGetById
} =  require('./disease.controller');

router
  .route("/")
  .get(controllerDiseasesGetAll)
  .post(authenticate, authorize, controllerDiseaseInsert);

router
  .route('/archived')
  .get(authenticate, authorize, controllerDiseasesGetAllDeleted);

router
  .route("/:id")
  .get(controllerDiseasesGetById)
  .put(authenticate, authorize, controllerDiseaseUpdate)
  .delete(authenticate, authorize, controllerDiseaseDelete);

module.exports = router;
