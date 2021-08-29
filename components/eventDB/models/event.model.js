const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    enum : ['blood', 'medical'],
    required: true,
  },
  address: { 
    type: String,
    required: true
   },
  contact: {
    type: [Number]
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
let eventModel = mongoose.model("eventDB", eventSchema);
module.exports = eventModel;
