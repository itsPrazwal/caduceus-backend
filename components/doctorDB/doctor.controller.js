const { makeResponseObject } = require("../../utils/responder");
const { findAllDeletedDoctors, findAllDoctors, findDoctorById, findDoctorByUserId, insertDoctor, removeDoctor, updateDoctor } = require("./doctor.query");

const controllerDoctorInsert = async (req, res, next) => {
  try {
    const data = await insertDoctor(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on inserting doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorsGetAll = async (req, res, next) => {
  try {
    const data = await findAllDoctors()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedDoctors()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all archived doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorsGetById = async (req, res, next) => {
  try {
    const data = await findDoctorById({ _id: req.params.id })
    res.status(200).json(makeResponseObject(data, 'Success on fetching a doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorsGetByUserId = async (req, res, next) => {
  try {
    const data = await findDoctorByUserId(req.params.userId)
    res.status(200).json(makeResponseObject(data, 'Success on fetching a doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorUpdate = async (req, res, next) => {
  try {
    const data = await updateDoctor(req.params.id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating doctor.'))
  } catch (err) {
    next(err);
  }
}

const controllerDoctorDelete = async (req, res, next) => {
  try {
    const data = await removeDoctor(req.params.id)
    res.status(200).json(makeResponseObject(data, 'Success on removing doctor.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerDoctorDelete,
  controllerDoctorUpdate,
  controllerDoctorInsert,
  controllerDoctorsGetAll,
  controllerDoctorsGetAllDeleted,
  controllerDoctorsGetById,
  controllerDoctorsGetByUserId
};
