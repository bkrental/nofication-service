const nodemailer = require('nodemailer');

const NotiService = {
  sendNoti: async ({ template, userEmail }) => {
    console.log('sendNoti service', template, userEmail);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "bkrental.automail@gmail.com",
        pass: "khjy rzun qcxj couj"
      }
    });
    console.log('auth: bkrental.automail@gmail.com');

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: userEmail,
        subject: 'Notification',
        text: template
      });
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      return error;
    };
  }
}

module.exports = NotiService;