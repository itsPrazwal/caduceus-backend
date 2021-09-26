module.exports = (data1, data2, type) => {
  if(data2.status) data1.status = data2.status
  if(data2.message) data1.message = data2.message
  if(data2.deleted) data1.deleted = data2.deleted

  if(type === 'CREATE')
    if(data2.donorId) data1.donorId = data2.donorId
    if(data2.patientId) data1.patientId = data2.patientId
    
  return data1;
};