module.exports = (data1, data2) => {
  if(data2.address) data1.address = data2.address
  if(data2.ambulanceName) data1.ambulanceName = data2.ambulanceName
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.email) data1.email = data2.email
  if(data2.numbers) data1.numbers = data2.numbers
  if(data2.organizationName) data1.organizationName = data2.organizationName
  return data1;
};
