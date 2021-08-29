const bloodBankModel = require("./models/bloodBank.model");
const mapBloodBank = require("./models/mapBloodBank");

const findAllBloodBanks = () => bloodBankModel.find({ deleted: false });

const findBloodBankById = (id) => bloodBankModel.findOne({ _id: id, deleted: false });

const findAllDeletedBloodBanks = () => bloodBankModel.find({ deleted: true });

const insertBloodBank = (data) => mapBloodBank(new bloodBankModel(data), data).save();

const updateBloodBank = (id, data) => new Promise((resolve, reject) => {
    bloodBankModel.findById(id).then((bloodBank) => {
      let mappedBloodBank = mapBloodBank(bloodBank, data);
      mappedBloodBank.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Blood Bank.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeBloodBank = (id) => bloodBankModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllBloodBanks,
  findAllDeletedBloodBanks,
  findBloodBankById,
  insertBloodBank,
  updateBloodBank,
  removeBloodBank
};
