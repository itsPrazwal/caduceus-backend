const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bodyPart: {
    type: [String],
    required: true
  },
  causes: { type: [String], required: true },
  symptoms: { type: [String], require: true },
  riskFactors: { type: [String] },
  prevention: { type: [String] },
  complications: { type: [String] },
  homeRemedy: { type: [String] },
  deleted: {
    type: Boolean,
    default: false,
  }
});
let diseaseModel = mongoose.model("diseaseDB", diseaseSchema);
module.exports = diseaseModel;
