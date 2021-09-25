function prepareOtpMail({emailId, otpCode, fullName}) {
  return ({
    from: "Caduceus <noreply@caduceus.com>",
    to: emailId,
    subject: "Email Verification",
    html: `
      <html>
          <head>
            <style>
            h2{
                background: rgba(231, 231, 231, 0.5);
                border: 1px solid #dbdbdb;
                border-radius: 5px;
                display: inline;
                padding: 7px 15px;
                margin-right: 10px;
            }
            </style>
          </head>
          <body>
              <p>Hello ${fullName},</p>
              <p>Thank you for joining with us.</p>
              </br>
              <p>Please use the OTP code provided below to verify.</p>
              </br>
              <h2>${otpCode.charAt(0)}</h2>
              <h2>${otpCode.charAt(1)}</h2>
              <h2>${otpCode.charAt(2)}</h2>
              <h2>${otpCode.charAt(3)}</h2>
              <h2>${otpCode.charAt(4)}</h2>
              <h2>${otpCode.charAt(5)}</h2>
              <p>This code will expire in 5 minutes and can be used only once.</p>
              </br>
              <p>If you didn't request this mail, please ignore and delete this message.</p>
              <p>Thank You</p>
              <p>Caduceus Pvt. Ltd.</p>
          </body>
      </html>
    `,
  });
}

module.exports = { prepareMail: prepareOtpMail }
