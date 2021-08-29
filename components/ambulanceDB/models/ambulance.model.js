const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
  organizationName: {
    type: String,
    required: true,
  },
  contact: {
    email: { type: String, required: true, },
    numbers: { type: [Number] },
    address: { type: String },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let ambulanceModel = mongoose.model("ambulanceDB", ambulanceSchema);
module.exports = ambulanceModel;
