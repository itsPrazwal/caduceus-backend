const departmentModel = require("./models/department.model");
const mapDepartment = require("./models/mapDepartment");

const findAllDepartments = () => departmentModel.find({ deleted: false });

const findDepartmentById = (id) => departmentModel.findOne({ _id: id, deleted: false });

const findAllDeletedDepartments = () => departmentModel.find({ deleted: true });

const insertDepartment = (data) => mapDepartment(new departmentModel(data), data).save();

const updateDepartment = (id, data) => new Promise((resolve, reject) => {
    departmentModel.findById(id).then((department) => {
      let mappedDepartment = mapDepartment(department, data);
      mappedDepartment.save((err, done) => {
        if (err) {
          return reject({
            message: "Failed to update department.",
            statue: 400,
          });
        }
        resolve(done);
      });
    });
  });

const removeDepartment = (id) => departmentModel.findByIdAndUpdate(id, { deleted: true }, { select: {_id: 1} });

module.exports = {
  findAllDepartments,
  findAllDeletedDepartments,
  findDepartmentById,
  insertDepartment,
  updateDepartment,
  removeDepartment
};
