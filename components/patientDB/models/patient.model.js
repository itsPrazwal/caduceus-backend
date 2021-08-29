const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
  },
  bloodGroup: {
    type: String,
    enum: ['A-', 'B-', 'O-', 'AB-','A+', 'B+', 'O+', 'AB+'],
    required: true,
  },
  contact: {
    email: { type: String, required: true, },
    number1: { type: Number, required: true, },
    number2: { type: Number },
    address: { type: String },
  },
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
