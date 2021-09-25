const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodDonorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  requests: [{
    patientId: { 
      type: Schema.Types.ObjectId,
      ref: 'patientDB'
    },
    status: { type: String, enum: ['pending', 'accepted', 'declined'] },
    message: { type: String }
  }],
  deleted: {
    type: Boolean,
    default: false,
  },
});
let bloodDonorModel = mongoose.model("bloodDonorDB", bloodDonorSchema);
module.exports = bloodDonorModel;
