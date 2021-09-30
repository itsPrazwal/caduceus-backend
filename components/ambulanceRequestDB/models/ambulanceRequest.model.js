const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceResuestSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  status: { type: String, enum: ['pending', 'dispatched', 'canceled'], default: 'pending' },
  location: { type: String, required: true },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let ambulanceResuestModel = mongoose.model("ambulanceResuestDB", ambulanceResuestSchema);
module.exports = ambulanceResuestModel;
