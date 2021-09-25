const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userDB',
    required: true,
  },
  education: [{ 
    educationInstitution: { type: String },
    degree: { type: String },
    address: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    currentlyEnrolled: { type: Boolean },
    speciality: { type: String }
   }],
  relatedDepartment: [{
    type: Schema.Types.ObjectId,
    ref: 'departmentDB'
  }],
  experience: [{
    medicalInstitution: { type: String },
    address: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    currentCompany: { type: Boolean }
  }],
  linkedHospital: {
    type: Schema.Types.ObjectId,
    ref: 'hospitalDB'
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let doctorModel = mongoose.model("doctorDB", doctorSchema);
module.exports = doctorModel;
