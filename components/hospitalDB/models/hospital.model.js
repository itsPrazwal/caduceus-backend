const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: { type: [String] },
  detail: { type: String },
  availableServices: { type: [String] },
  contact: {
    email: { type: String, },
    numbers: { type: [Number] },
    address: { type: String },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let hospitalModel = mongoose.model("hospitalDB", hospitalSchema);
module.exports = hospitalModel;
