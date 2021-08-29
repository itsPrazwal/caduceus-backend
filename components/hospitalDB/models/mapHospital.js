module.exports = (data1, data2) => {
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.name) data1.name = data2.name
  if(data2.speciality) data1.speciality = data2.speciality
  if(data2.detail) data1.detail = data2.detail
  if(data2.availableServices) data1.availableServices = data2.availableServices
  if(data2.contact){
    if(data2.contact.email) data1.contact.email = data2.contact.email
    if(data2.contact.numbers) data1.contact.numbers = data2.contact.numbers
    if(data2.contact.address) data1.contact.address = data2.contact.address
  }
  return data1;
};
