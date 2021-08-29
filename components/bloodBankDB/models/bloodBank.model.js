const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodBankSchema = new Schema({
  bloodBankName: {
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
let bloodBankModel = mongoose.model("bloodBankDB", bloodBankSchema);
module.exports = bloodBankModel;
