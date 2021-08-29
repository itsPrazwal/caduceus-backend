const bloodDonorModel = require("./models/bloodDonor.model");
const mapBloodDonor = require("./models/mapBloodDonor");

const findAllBloodDonors = () => bloodDonorModel.find({ deleted: false });

const findBloodDonorById = (id) => bloodDonorModel.findOne({ _id: id, deleted: false });

const findAllDeletedBloodDonors = () => bloodDonorModel.find({ deleted: true });

const insertBloodDonor = (data) => mapBloodDonor(new bloodDonorModel(data), data).save();

const updateBloodDonor = (id, data) => new Promise((resolve, reject) => {
    bloodDonorModel.findById(id).then((bloodDonor) => {
      let mappedBloodDonor = mapBloodDonor(bloodDonor, data);
      mappedBloodDonor.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Blood Donor.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeBloodDonor = (id) => bloodDonorModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllBloodDonors,
  findAllDeletedBloodDonors,
  findBloodDonorById,
  insertBloodDonor,
  updateBloodDonor,
  removeBloodDonor
};
