module.exports = (data1, data2) => {
  if(data2.userId) data1.userId = data2.userId
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.education) data1.education = data2.education
  if(data2.relatedDepartment) data1.relatedDepartment = data2.relatedDepartment
  if(data2.experience) data1.experience = [...data2.experience]
  if(data2.linkedHospital) data1.linkedHospital = data2.linkedHospital
  if(data2.image) data1.image = data2.image
  return data1;
};
