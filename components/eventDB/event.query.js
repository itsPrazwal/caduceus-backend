const eventModel = require("./models/event.model");
const mapEvent = require("./models/mapEvent");

const findAllEvents = () => eventModel.find({ deleted: false });

const findEventById = (id) => eventModel.findOne({ _id: id, deleted: false });

const findAllDeletedEvents = () => eventModel.find({ deleted: true });

const insertEvent = (data) => mapEvent(new eventModel(data), data).save();

const updateEvent = (id, data) => new Promise((resolve, reject) => {
    eventModel.findById(id).then((event) => {
      let mappedEvent = mapEvent(event, data);
      mappedEvent.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Event.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeEvent = (id) => eventModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllEvents,
  findAllDeletedEvents,
  findEventById,
  insertEvent,
  updateEvent,
  removeEvent
};
