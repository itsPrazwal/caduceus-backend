module.exports = (data1, data2) => {
  if(data2.userId) data1.userId = data2.userId
  if(data2.fullName) data1.fullName = data2.fullName
  if(data2.dob) data1.dob = data2.dob
  if(data2.bloodGroup) data1.bloodGroup = data2.bloodGroup
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.contact){
    if(data2.contact.email) data1.contact.email = data2.contact.email
    if(data2.contact.number1) data1.contact.number1 = data2.contact.number1
    if(data2.contact.number2) data1.contact.number2 = data2.contact.number2
    if(data2.contact.address){
      if(data2.contact.address.isPublic) data1.contact.address.isPublic = data2.contact.address.isPublic
      if(data2.contact.address.detail) data.contact.address.detail = data2.contact.address.detail
    } 
  }
    
  return data1;
};
