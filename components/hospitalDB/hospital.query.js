const hospitalModel = require("./models/hospital.model");
const mapHospital = require("./models/mapHospital");

const findAllHospitals = () => hospitalModel.find({ deleted: false });

const findHospitalById = (id) => hospitalModel.findOne({ _id: id, deleted: false });

const findAllDeletedHospitals = () => hospitalModel.find({ deleted: true });

const insertHospital = (data) => mapHospital(new hospitalModel(data), data).save();

const updateHospital = (id, data) => new Promise((resolve, reject) => {
    hospitalModel.findById(id).then((hospital) => {
      let mappedHospital = mapHospital(hospital, data);
      mappedHospital.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Hospital.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeHospital = (id) => hospitalModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllHospitals,
  findAllDeletedHospitals,
  findHospitalById,
  insertHospital,
  updateHospital,
  removeHospital
};
