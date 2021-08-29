const diseaseModel = require("./models/disease.model");
const mapDisease = require("./models/mapDiesease");

const findAllDiseases = () => diseaseModel.find({ deleted: false });

const findDiseaseById = (id) => diseaseModel.findOne({ _id: id, deleted: false });

const findAllDeletedDiseases = () => diseaseModel.find({ deleted: true });

const insertDisease = (data) => mapDisease(new diseaseModel(data), data).save();

const updateDisease = (id, data) => new Promise((resolve, reject) => {
    diseaseModel.findOne({ _id: id, deleted: false })
    .then((disease) => {
      if(!disease){
        reject({
          message: "Disease not found or has been removed.",
          status: 404,
        })
      }
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
    })
    .catch((err) => {
      reject(err)
    })
  });

const removeDisease = (id) => diseaseModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllDiseases,
  findAllDeletedDiseases,
  findDiseaseById,
  insertDisease,
  updateDisease,
  removeDisease
};
