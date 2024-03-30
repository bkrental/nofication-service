// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const NotiService = {
  sendMail: async (mailOptions: MailOptions) => {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.SENDER_EMAIL}`,
        pass: `${process.env.SENDER_EMAIL_PASSWORD}`
      }
    });

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      throw error;
    };
  }
}

export default NotiService;