module.exports = (data1, data2) => {
  if(data2.eventName) data1.eventName = data2.eventName
  if(data2.eventCategory) data1.eventCategory = data2.eventCategory
  if(data2.address) data1.address = data2.address
  if(data2.contact) data1.contact = data2.contact
  if(data2.deleted) data1.deleted = data2.deleted
  return data1;
};
