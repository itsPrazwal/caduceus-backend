const { findAllDeletedEvents, findAllEvents, findEventById, insertEvent, removeEvent, updateEvent } = require("./event.query");

const controllerEventInsert = async (req, res, next) => {
  try {
    const data = await insertEvent(req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerEventsGetAll = async (req, res, next) => {
  try {
    const data = await findAllEvents()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerEventsGetAllDeleted = async (req, res, next) => {
  try {
    const data = await findAllDeletedEvents()
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerEventsGetById = async (req, res, next) => {
  try {
    const data = await findEventById({ _id: req.params.id })
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerEventUpdate = async (req, res, next) => {
  try {
    const data = await updateEvent(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

const controllerEventDelete = async (req, res, next) => {
  try {
    const data = await removeEvent(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

module.exports = {
  controllerEventDelete,
  controllerEventUpdate,
  controllerEventInsert,
  controllerEventsGetAll,
  controllerEventsGetAllDeleted,
  controllerEventsGetById,
};
