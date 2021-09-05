const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: { type: [String] },
  detail: { type: String },
  email: { type: String, },
  numbers: { type: [Number], required: true },
  address: { type: String, required: true },
  ambulanceId: {
    type: Schema.Types.ObjectId,
    ref: 'ambulanceDB',
    default: null
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let hospitalModel = mongoose.model("hospitalDB", hospitalSchema);
module.exports = hospitalModel;
