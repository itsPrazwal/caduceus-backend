function generateOTPCode(){
  const randomNumber = Math.random().toString();
  const otp = randomNumber.slice(randomNumber.length - 6, randomNumber.length);
  const expiry = new Date(Date.now() + 1000 * 60 * 5);
  return{
    otp,
    expiry
  }
}

module.exports = { generateOTPCode }
