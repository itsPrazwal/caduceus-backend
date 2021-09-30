module.exports = (data1, data2) => {
  if(data2.fullName) data1.fullName = data2.fullName
  if(data2.contactNumber) data1.contactNumber = data2.contactNumber
  if(data2.location) data1.location = data2.location
  if(data2.status) data1.status = data2.status
  if(data2.deleted) data1.deleted = data2.deleted
  return data1;
};