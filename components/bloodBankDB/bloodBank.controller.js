const { findAllDeletedBloodBanks, findAllBloodBanks, findBloodBankById, insertBloodBank, removeBloodBank, updateBloodBank } = require("./bloodBank.query");
const { makeResponseObject } = require("../../utils/responder");

const controllerBloodBankInsert = async (req, res, next) => {
  try {
    const data = await insertBloodBank(req.body)
    res.status(200).json(makeResponseObject(data, 'Success on adding new blood bank.'))
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetAll = async (req, res, next) => {
  try {
    const data = await findAllBloodBanks()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all blood banks.'))
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedBloodBanks()
    res.status(200).json(makeResponseObject(data, 'Success on fetching all archived blood banks.'))
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetById = async (req, res, next) => {
  try {
    const data = await findBloodBankById({ _id: req.params.id })
    res.status(200).json(makeResponseObject(data, 'Success on fetching a blood bank.'))
  } catch (err) {
    next(err);
  }
}

const controllerBloodBankUpdate = async (req, res, next) => {
  try {
    const data = await updateBloodBank(req.params.id, req.body)
    res.status(200).json(makeResponseObject(data, 'Success on updating blood bank.'))
  } catch (err) {
    next(err);
  }
}

const controllerBloodBankDelete = async (req, res, next) => {
  try {
    const data = await removeBloodBank(req.params.id)
    res.status(200).json(makeResponseObject(data, 'Success on removing blood bank.'))
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerBloodBankDelete,
  controllerBloodBankUpdate,
  controllerBloodBankInsert,
  controllerBloodBanksGetAll,
  controllerBloodBanksGetAllDeleted,
  controllerBloodBanksGetById,
};
