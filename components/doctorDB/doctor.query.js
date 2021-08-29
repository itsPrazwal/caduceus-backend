const doctorModel = require("./models/doctor.model");
const mapDoctor = require("./models/mapDoctor");

const findAllDoctors = () => doctorModel.find({ deleted: false });

const findDoctorById = (id) => doctorModel.findOne({ _id: id, deleted: false });

const findAllDeletedDoctors = () => doctorModel.find({ deleted: true });

const insertDoctor = (data) => mapDoctor(new doctorModel(data), data).save();

const updateDoctor = (id, data) => new Promise((resolve, reject) => {
    doctorModel.findById(id).then((doctor) => {
      let mappedDoctor = mapDoctor(doctor, data);
      mappedDoctor.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Doctor.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeDoctor = (id) => doctorModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllDoctors,
  findAllDeletedDoctors,
  findDoctorById,
  insertDoctor,
  updateDoctor,
  removeDoctor
};
