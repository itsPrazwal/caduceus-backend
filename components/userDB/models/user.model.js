const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
  },
  bloodGroup: {
    type: String,
    enum: ['A-', 'B-', 'O-', 'AB-','A+', 'B+', 'O+', 'AB+'],
  },
  activeForDonation: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  phoneNumber: {
    type: Number
  },
  address: {
    isPublic: { type: Boolean },
    detail: { type: String },
  },
  bio: { type: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpCode: {
    type: String
  },
  otpCodeExpiry: {
    type: Date
  },
  userType: {
    type: String,
    enum : ['ADMIN','PATIENT', 'DOCTOR', 'BLOOD_DONOR'],
  },
  deleted: {
    type: Boolean,
    default: false,
  }
});
let userModel = mongoose.model("userDB", userSchema);
module.exports = userModel;
