module.exports = function(data1, data2) {
  if (data2.emailId) data1.emailId = data2.emailId;
  if (data2.fullName) data1.fullName = data2.fullName;
  if (data2.isVerified) data1.isVerified = data2.isVerified;
  if (data2.password) data1.password = data2.password;
  if (data2.otpCode) data1.otpCode = data2.otpCode;
  if (data2.otpCodeExpiry) data1.otpCodeExpiry = data2.otpCodeExpiry;
  if (data2.userType) data1.userType = data2.userType;
  if (data2.deleted) data1.deleted = data2.deleted;
  if (data2.dob) data1.dob = data2.dob;
  if (data2.bloodGroup) data1.bloodGroup = data2.bloodGroup;
  if (data2.gender) data1.gender = data2.gender;
  if (data2.phoneNumber) data1.phoneNumber = data2.phoneNumber;
  if (data2.address) data1.address = data2.address;
  if (data2.activeForDonation) data1.activeForDonation = data2.activeForDonation;
  if (data2.bio) data1.bio = data2.bio;
  return data1;
};
