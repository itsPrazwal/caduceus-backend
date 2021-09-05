const { findAllDeletedHospitals, findAllHospitals, findHospitalById, insertHospital, removeHospital, updateHospital } = require("./hospital.query");
const { makeResponseObject } = require("../../utils/responder");
const { insertAmbulance, updateAmbulance } = require("../ambulanceDB/ambulance.query")

const controllerHospitalInsert = async (req, res, next) => {
  try {
    let ambulanceId = null
    if(req.body.ambulanceNumber && req.body.ambulanceNumber.length > 0){
      const ambulance = await insertAmbulance({ambulanceName: `${req.body.name} ambulance`, organizationName: req.body.name, numbers: [...req.body.ambulanceNumber], address: req.body.address, email: req.body.email})
      ambulanceId = ambulance._id
    }
    const data = await insertHospital({ ...req.body, ambulanceId })
    res.status(200).json(makeResponseObject(data, 'Success on adding new hospital.'))
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetAll = async (req, res, next) => {
  try {
    const data = await findAllHospitals()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all hospitals.'))
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedHospitals()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all archived hospitals.'))
  } catch (err) {
    next(err);
  }
}

const controllerHospitalsGetById = async (req, res, next) => {
  try {
    const data = await findHospitalById({ _id: req.params.id })
    res.status(200).json(makeResponseObject(data, 'Success on fetching a hospital.'))
  } catch (err) {
    next(err);
  }
}

const controllerHospitalUpdate = async (req, res, next) => {
  try {
    let ambulanceId = null
    if(req.body.ambulanceNumber && req.body.ambulanceNumber.length > 0){
      console.log('in')
      if(req.body.ambulanceId){
        console.log('old')
        ambulanceId = req.body.ambulanceId
        await updateAmbulance(req.body.ambulanceId, { numbers: [...req.body.ambulanceNumber] })
      }else{
        console.log('new')
        const ambulance = await insertAmbulance({ambulanceName: `${req.body.name} ambulance`, organizationName: req.body.name, numbers: [...req.body.ambulanceNumber], address: req.body.address, email: req.body.email})
        ambulanceId = ambulance._id
      }
    }
    console.log('am: ', ambulanceId)
    const data = await updateHospital(req.params.id, { ...req.body, ambulanceId })
    res.status(200).json(makeResponseObject(data, 'Success on updating hospital.'))
  } catch (err) {
    next(err);
  }
}

const controllerHospitalDelete = async (req, res, next) => {
  try {
    const data = await removeHospital(req.params.id)
    res.status(200).json(makeResponseObject(data, 'Success on removing hospital.'))
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
