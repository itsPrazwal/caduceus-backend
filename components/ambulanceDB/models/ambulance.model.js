const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
  ambulanceName: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  email: { type: String, },
  numbers: { type: [Number], required: true, },
  address: { type: String },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let ambulanceModel = mongoose.model("ambulanceDB", ambulanceSchema);
module.exports = ambulanceModel;
