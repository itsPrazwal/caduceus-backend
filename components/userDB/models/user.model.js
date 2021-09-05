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
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String
  },
  tokenExpiry: {
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
