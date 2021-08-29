const { findAllDeletedDepartments, findAllDepartments, findDepartmentById, insertDepartment, removeDepartment, updateDepartment } = require("./department.query");

const controllerDepartmentInsert = async (req, res, next) => {
  try {
    const data = await insertDepartment(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerDepartmentsGetAll = async (req, res, next) => {
  try {
    const data = await findAllDepartments()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerDepartmentsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedDepartments()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerDepartmentsGetById = async (req, res, next) => {
  try {
    const data = await findDepartmentById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerDepartmentUpdate = async (req, res, next) => {
  try {
    const data = await updateDepartment(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerDepartmentDelete = async (req, res, next) => {
  try {
    const data = await removeDepartment(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerDepartmentDelete,
  controllerDepartmentUpdate,
  controllerDepartmentInsert,
  controllerDepartmentsGetAll,
  controllerDepartmentsGetAllDeleted,
  controllerDepartmentsGetById,
};
