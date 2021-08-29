const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  relatedDiseases:[{
    type: Schema.Types.ObjectId,
    ref: 'diseaseDB'
  }],
  deleted: {
    type: Boolean,
    default: false,
  }
});
let departmentModel = mongoose.model("departmentDB", departmentSchema);
module.exports = departmentModel;
