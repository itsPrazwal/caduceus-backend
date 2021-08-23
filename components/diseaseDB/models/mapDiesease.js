module.exports = (data1, data2) => {
  if(data2.name) data1.name = data2.name
  if(data2.bodyPart) data1.bodyPart = data2.bodyPart
  if(data2.causes) data1.causes = data2.causes
  if(data2.symptoms) data1.symptoms = data2.symptoms
  if(data2.riskFactors) data1.riskFactors = data2.riskFactors
  if(data2.prevention) data1.prevention = data2.prevention
  if(data2.complications) data1.complications = data2.complications
  if(data2.homeRemedy) data1.homeRemedy = data2.homeRemedy
  return data1;
};
