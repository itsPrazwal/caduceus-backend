const ambulanceRequestModal = require("./models/ambulanceRequest.model");
const mapRequestAmbulance = require("./models/mapAmbulanceRequest");

const findAllAmbulanceRequests = () => ambulanceRequestModal.find({ deleted: false });

const findAllDeletedAmbulanceRequests = () => ambulanceRequestModal.find({ deleted: true });

const createNewAmbulanceRequest = (data) => mapRequestAmbulance(new ambulanceRequestModal(data), data).save();

const updateAmbulanceRequest = (id, data) => new Promise((resolve, reject) => {
    ambulanceRequestModal.findById(id).then((Request) => {
      let mappedRequest = mapRequestAmbulance(Request, data);
      mappedRequest.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update Request.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeRequest = (id) => ambulanceRequestModal.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllAmbulanceRequests,
  findAllDeletedAmbulanceRequests,
  createNewAmbulanceRequest,
  updateAmbulanceRequest,
  removeRequest,
};
