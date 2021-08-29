const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodDonorSchema = new Schema({
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
    address: {
      isPublic: { type: Boolean },
      detail: { type: String },
    }
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let bloodDonorModel = mongoose.model("bloodDonorDB", bloodDonorSchema);
module.exports = bloodDonorModel;
