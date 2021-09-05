const { findAllDeletedAmbulances, findAllAmbulances, findAmbulanceById, insertAmbulance, removeAmbulance, updateAmbulance } = require("./ambulance.query");
const { makeResponseObject } = require("../../utils/responder");

const controllerAmbulanceInsert = async (req, res, next) => {
  try {
    const data = await insertAmbulance(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on adding new ambulance.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulancesGetAll = async (req, res, next) => {
  try {
    const data = await findAllAmbulances()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all ambulances.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulancesGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedAmbulances()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all archived ambulances.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulancesGetById = async (req, res, next) => {
  try {
    const data = await findAmbulanceById({ _id: req.params.id })
    res.status(200).json(makeResponseObject(data, 'Success on fetching an ambulance.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulanceUpdate = async (req, res, next) => {
  try {
    const data = await updateAmbulance(req.params.id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating ambulance.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulanceDelete = async (req, res, next) => {
  try {
    const data = await removeAmbulance(req.params.id)
    res.status(200).json(makeResponseObject(data, 'Success on removing ambulance.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerAmbulanceDelete,
  controllerAmbulanceUpdate,
  controllerAmbulanceInsert,
  controllerAmbulancesGetAll,
  controllerAmbulancesGetAllDeleted,
  controllerAmbulancesGetById,
};
