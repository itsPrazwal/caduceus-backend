const requestModal = require("./models/request.model");
const userModal = require('../userDB/models/user.model')
const mapRequest = require("./models/mapRequest");
const { ObjectId } = require('mongoose').Types

const findAllRequests = () => requestModal.find({ deleted: false });

const findRequestsOfUser = (id) => requestModal.find({ $or: [{donorId: ObjectId(id)}, {patientId: ObjectId(id)}], deleted: false });

const findUsersByRequest = (id) => new Promise((resolve, reject) => {
  requestModal.find({ donorId: ObjectId(id), deleted: false })
    .then((requests) => {
        if(!requests || requests.length === 0){
          return reject({
            message: 'No request found',
            status: 400
          })
        }
        const patientIds = requests.map(req => req.patientId)
        userModal.find({ deleted: false }, { emailId: 1, fullName: 1, gender: 1, dob: 1, phoneNumber: 1, bio: 1, address: 1, bloodGroup: 1 })
          .then((users) => {
            const filteredUserList = users.filter(user => patientIds.findIndex(pi => user._id.equals(pi)) > -1 )
            resolve(filteredUserList)
          })
    })
})

const findAllDeletedRequests = () => requestModal.find({ deleted: true });

const createNewRequest = (data) => mapRequest(new requestModal(data), data, 'CREATE').save();

const updateRequest = (id, data) => new Promise((resolve, reject) => {
    requestModal.findById(id).then((Request) => {
      let mappedRequest = mapRequest(Request, data, 'UPDATE');
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

const removeRequest = (id) => requestModal.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllRequests,
  findAllDeletedRequests,
  findRequestsOfUser,
  updateRequest,
  removeRequest,
  createNewRequest,
  findUsersByRequest,
};
