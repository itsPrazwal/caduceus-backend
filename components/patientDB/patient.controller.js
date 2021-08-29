const { findAllDeletedPatients, findAllPatients, findPatientById, insertPatient, removePatient, updatePatient } = require("./patient.query");

const controllerPatientInsert = async (req, res, next) => {
  try {
    const data = await insertPatient(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerPatientsGetAll = async (req, res, next) => {
  try {
    const data = await findAllPatients()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerPatientsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedPatients()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerPatientsGetById = async (req, res, next) => {
  try {
    const data = await findPatientById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerPatientUpdate = async (req, res, next) => {
  try {
    const data = await updatePatient(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerPatientDelete = async (req, res, next) => {
  try {
    const data = await removePatient(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerPatientDelete,
  controllerPatientUpdate,
  controllerPatientInsert,
  controllerPatientsGetAll,
  controllerPatientsGetAllDeleted,
  controllerPatientsGetById,
};
