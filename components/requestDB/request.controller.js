const { 
  findRequestsOfUser,
  updateRequest,
  createNewRequest,
  findUsersByRequest
 } = require("./request.query");
const { makeResponseObject } = require("../../utils/responder");

const controllerRequestCreate = async (req, res, next) => {
  try {
    const data = await createNewRequest(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on adding new request.'))
  } catch (err) {
    next(err);
  }
}

const controllerRequestGetByUserId = async (req, res, next) => {
  try {
    const data = await findRequestsOfUser(req.userId)
    res.status(200).json(makeResponseObject(data, 'Success on fetching requests by patient.'))
  } catch (err) {
    next(err);
  }
}

const controllerUserGetByRequest = async (req, res, next) => {
  try {
    const data = await findUsersByRequest(req.userId)
    res.status(200).json(makeResponseObject(data, 'Success on fetching requests by patient.'))
  } catch (err) {
    next(err);
  }
}

const controllerRequestUpdate = async (req, res, next) => {
  try {
    const data = await updateRequest(req.body._id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating request.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerRequestGetByUserId,
  controllerRequestUpdate,
  controllerRequestCreate,
  controllerUserGetByRequest,
};
