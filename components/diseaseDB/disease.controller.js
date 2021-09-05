const { makeResponseObject } = require("../../utils/responder");
const { findAllDeletedDiseases, findAllDiseases, findDiseaseById, insertDisease, removeDisease, updateDisease } = require("./disease.query");

const controllerDiseaseInsert = async (req, res, next) => {
  try {
    const data = await insertDisease(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on inserting disease.'))
  } catch (err) {
    next(err);
  }
}

const controllerDiseasesGetAll = async (req, res, next) => {
  try {
    const data = await findAllDiseases()
    res.status(200).json(makeResponseObject(data, 'Success on fetching diseases.'))
  } catch (err) {
    next(err);
  }
}

const controllerDiseasesGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedDiseases()
    res.status(200).json(makeResponseObject(data, 'Success on fetching deleted diseases.'))
  } catch (err) {
    next(err);
  }
}

const controllerDiseasesGetById = async (req, res, next) => {
  try {
    const data = await findDiseaseById({ _id: req.params.id })
    res.status(200).json(makeResponseObject(data, 'Success on fetching disease by id.'))
  } catch (err) {
    next(err);
  }
}

const controllerDiseaseUpdate = async (req, res, next) => {
  try {
    const data = await updateDisease(req.params.id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating disease.'))
  } catch (err) {
    next(err);
  }
}

const controllerDiseaseDelete = async (req, res, next) => {
  try {
    const data = await removeDisease(req.params.id)
    res.status(200).json(makeResponseObject(data, 'Success on removing disease.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerDiseaseDelete,
  controllerDiseaseUpdate,
  controllerDiseaseInsert,
  controllerDiseasesGetAll,
  controllerDiseasesGetAllDeleted,
  controllerDiseasesGetById,
};
