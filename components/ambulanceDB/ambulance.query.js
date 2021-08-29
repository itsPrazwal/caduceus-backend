const ambulanceModel = require("./models/ambulance.model");
const mapAmbulance = require("./models/mapAmbulance");

const findAllAmbulances = () => ambulanceModel.find({ deleted: false });

const findAmbulanceById = (id) => ambulanceModel.findOne({ _id: id, deleted: false });

const findAllDeletedAmbulances = () => ambulanceModel.find({ deleted: true });

const insertAmbulance = (data) => mapAmbulance(new ambulanceModel(data), data).save();

const updateAmbulance = (id, data) => new Promise((resolve, reject) => {
    ambulanceModel.findById(id).then((ambulance) => {
      let mappedAmbulance = mapAmbulance(ambulance, data);
      mappedAmbulance.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Ambulance.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeAmbulance = (id) => ambulanceModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllAmbulances,
  findAllDeletedAmbulances,
  findAmbulanceById,
  insertAmbulance,
  updateAmbulance,
  removeAmbulance
};
