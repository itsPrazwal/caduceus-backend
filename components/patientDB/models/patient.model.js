const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  requestTODonor:[{
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'bloodDonorDB',
    },
    response: { type: String, enum: ['pending', 'accepted', 'declined'] },
    message: { type: String }
  }],
  disease: [{
    type: Schema.Types.ObjectId,
    ref: 'diseaseDB',
  }],
  additionalInformation: { type: String },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let patientModel = mongoose.model("patientDB", patientSchema);
module.exports = patientModel;
