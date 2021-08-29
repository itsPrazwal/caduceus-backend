module.exports = (data1, data2) => {
  if(data2.deleted) data1.deleted = data2.deleted
  if(data2.bloodBankName) data1.bloodBankName = data2.bloodBankName
  if(data2.contact){
    if(data2.contact.email) data1.contact.email = data2.contact.email
    if(data2.contact.numbers) data1.contact.numbers = data2.contact.numbers
    if(data2.contact.address) data1.contact.address = data2.contact.address
  }
  return data1;
};
