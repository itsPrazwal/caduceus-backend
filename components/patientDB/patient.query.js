const patientModel = require("./models/patient.model");
const mapPatient = require("./models/mapPatient");

const findAllPatients = () => patientModel.find({ deleted: false });

const findPatientById = (id) => patientModel.findOne({ _id: id, deleted: false });

const findAllDeletedPatients = () => patientModel.find({ deleted: true });

const insertPatient = (data) => mapPatient(new patientModel(data), data).save();

const updatePatient = (id, data) => new Promise((resolve, reject) => {
    patientModel.findById(id).then((patient) => {
      let mappedPatient = mapPatient(patient, data);
      mappedPatient.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Patient.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removePatient = (id) => patientModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllPatients,
  findAllDeletedPatients,
  findPatientById,
  insertPatient,
  updatePatient,
  removePatient
};
