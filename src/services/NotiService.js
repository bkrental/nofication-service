const nodemailer = require('nodemailer');
const fs = require('fs');

const NotiService = {
  sendNoti: async (mailOptions) => {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "bkrental.automail@gmail.com",
        pass: "khjy rzun qcxj couj"
      }
    });

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      return error;
    };
  }
}

module.exports = NotiService;