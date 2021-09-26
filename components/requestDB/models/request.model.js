const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  message: { type: String },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let requestModel = mongoose.model("requestDB", requestSchema);
module.exports = requestModel;
