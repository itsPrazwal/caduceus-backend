module.exports = (data1, data2) => {
  if(data2.userId) data1.userId = data2.userId
  if(data2.requestId) data1.requestId = data2.requestId
  if(data2.deleted) data1.deleted = data2.deleted
    
  return data1;
};
