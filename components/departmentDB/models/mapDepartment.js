module.exports = (data1, data2) => {
  if(data2.name) data1.name = data2.name
  if(data2.relatedDisease) data1.relatedDisease = data2.relatedDisease
  return data1;
};
