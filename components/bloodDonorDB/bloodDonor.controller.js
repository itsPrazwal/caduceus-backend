const { findAllDeletedBloodDonors, findAllBloodDonors, findBloodDonorById, insertBloodDonor, removeBloodDonor, updateBloodDonor } = require("./bloodDonor.query");

const controllerBloodDonorInsert = async (req, res, next) => {
  try {
    const data = await insertBloodDonor(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodDonorsGetAll = async (req, res, next) => {
  try {
    const data = await findAllBloodDonors()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodDonorsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedBloodDonors()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodDonorsGetById = async (req, res, next) => {
  try {
    const data = await findBloodDonorById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodDonorUpdate = async (req, res, next) => {
  try {
    const data = await updateBloodDonor(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerBloodDonorDelete = async (req, res, next) => {
  try {
    const data = await removeBloodDonor(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerBloodDonorDelete,
  controllerBloodDonorUpdate,
  controllerBloodDonorInsert,
  controllerBloodDonorsGetAll,
  controllerBloodDonorsGetAllDeleted,
  controllerBloodDonorsGetById,
};
