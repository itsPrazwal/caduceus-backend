const { findAllDeletedBloodBanks, findAllBloodBanks, findBloodBankById, insertBloodBank, removeBloodBank, updateBloodBank } = require("./bloodBank.query");

const controllerBloodBankInsert = async (req, res, next) => {
  try {
    const data = await insertBloodBank(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetAll = async (req, res, next) => {
  try {
    const data = await findAllBloodBanks()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedBloodBanks()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodBanksGetById = async (req, res, next) => {
  try {
    const data = await findBloodBankById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodBankUpdate = async (req, res, next) => {
  try {
    const data = await updateBloodBank(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodBankDelete = async (req, res, next) => {
  try {
    const data = await removeBloodBank(req.params.id)
    res.status(200).json(data)
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
