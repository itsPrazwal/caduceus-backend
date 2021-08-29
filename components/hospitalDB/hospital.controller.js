const { findAllDeletedHospitals, findAllHospitals, findHospitalById, insertHospital, removeHospital, updateHospital } = require("./hospital.query");

const controllerHospitalInsert = async (req, res, next) => {
  try {
    const data = await insertHospital(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetAll = async (req, res, next) => {
  try {
    const data = await findAllHospitals()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedHospitals()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetById = async (req, res, next) => {
  try {
    const data = await findHospitalById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerHospitalUpdate = async (req, res, next) => {
  try {
    const data = await updateHospital(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerHospitalDelete = async (req, res, next) => {
  try {
    const data = await removeHospital(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerHospitalDelete,
  controllerHospitalUpdate,
  controllerHospitalInsert,
  controllerHospitalsGetAll,
  controllerHospitalsGetAllDeleted,
  controllerHospitalsGetById,
};
