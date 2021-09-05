module.exports = (data1, data2) => {
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.name) data1.name = data2.name
  if(data2.speciality) data1.speciality = data2.speciality
  if(data2.detail) data1.detail = data2.detail
  if(data2.email) data1.email = data2.email
  if(data2.numbers) data1.numbers = data2.numbers
  if(data2.address) data1.address = data2.address
  if(data2.ambulanceNumber) data1.ambulanceNumber = data2.ambulanceNumber
  if(data2.ambulanceId) data1.ambulanceId = data2.ambulanceId
  return data1;
};
