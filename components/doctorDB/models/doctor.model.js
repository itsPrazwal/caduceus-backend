const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
  speciality: { type: [String] },
  educationDegree: { type: [String] },
  relatedDepartment: [{
    type: Schema.Types.ObjectId,
    ref: 'departmentDB'
  }],
  contact: {
    email: { type: String },
    number1: { type: Number },
    number2: { type: Number },
  },
  experience: { type: Number },
  linkedHospital: {
    type: Schema.Types.ObjectId,
    ref: 'hospitalDB'
  },
  image: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});
let doctorModel = mongoose.model("doctorDB", doctorSchema);
module.exports = doctorModel;
