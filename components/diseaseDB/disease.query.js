const diseaseModel = require("./models/disease.model");
const mapDisease = require("./models/mapDiesease");

const findAllDiseases = () => diseaseModel.find({ deleted: false });

const findById = (id) => diseaseModel.findOne({ _id: id, deleted: false });

const findAllDeletedDiseases = () => diseaseModel.find();

const insertDisease = (data) => mapDisease(new diseaseModel(data), data).save();

const updateDisease = (id, data) => new Promise((resolve, reject) => {
    diseaseModel.findById(id).then((disease) => {
      let mappedDisease = mapDisease(disease, data);
      mappedDisease.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update disease.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeDisease = (id) => diseaseModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllDiseases,
  findAllDeletedDiseases,
  findById,
  insertDisease,
  updateDisease,
  removeDisease
};
