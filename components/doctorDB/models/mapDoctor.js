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
  }
  if(data2.speciality) data1.speciality = data2.speciality
  if(data2.educationDegree) data1.educationDegree = data2.educationDegree
  if(data2.relatedDepartment) data1.relatedDepartment = data2.relatedDepartment
  if(data2.experience) data1.experience = data2.experience
  if(data2.image) data1.image = data2.image
  return data1;
};
