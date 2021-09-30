const { 
  findAllAmbulanceRequests,
  createNewAmbulanceRequest,
  findAllDeletedAmbulanceRequests,
  removeRequest,
  updateAmbulanceRequest
 } = require("./ambulanceRequest.query");
const { makeResponseObject } = require("../../utils/responder");

const controllerAmbulanceRequestCreate = async (req, res, next) => {
  try {
    const data = await createNewAmbulanceRequest(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on adding new request.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulanceRequestGetAll = async (req, res, next) => {
  try {
    const data = await findAllAmbulanceRequests()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all request.'))
  } catch (err) {
    next(err);
  }
}

const controllerAmbulanceRequestUpdate = async (req, res, next) => {
  try {
    const data = await updateAmbulanceRequest(req.body._id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating request.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerAmbulanceRequestUpdate,
  controllerAmbulanceRequestCreate,
  controllerAmbulanceRequestGetAll
};
