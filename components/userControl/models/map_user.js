module.exports = function(data1, data2) {
  if (data2.emailId) data1.emailId = data2.emailId;
  if (data2.isVerified) data1.isVerified = data2.isVerified;
  if (data2.password) data1.password = data2.password;
  if (data2.token) data1.token = data2.token;
  if (data2.tokenExpiry) data1.tokenExpiry = data2.tokenExpiry;
  if (data2.userType) data1.userType = data2.userType;
  return data1;
};
