module.exports = (data1, data2) => {
  if(data2.name) data1.name = data2.name
  if(data2.relatedDiseases) data1.relatedDiseases = data2.relatedDiseases
  return data1;
};
