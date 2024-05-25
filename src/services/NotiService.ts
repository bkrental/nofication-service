// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";
import getTemplate from "../utils/getTemplate";
interface MailOption {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const NotiService = {
  sendMail: async (msg: any) => {
    // try {
    // prepare mail to send
    if (!msg) {
      throw new Error("Message is empty");
    }

    console.log("Received message:", msg.content.toString());
    const { template, userEmail, ...mailParams } = JSON.parse(
      msg.content.toString()
    );

    if (!template || !userEmail) {
      throw new Error("Invalid message format");
    }

    const mailOptions: MailOption = {
      from: `${process.env.SENDER_EMAIL}`,
      to: userEmail,
      subject: "Notification",
      html: getTemplate(template, mailParams),
    };

    // send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.SENDER_EMAIL}`,
        pass: `${process.env.SENDER_EMAIL_PASSWORD}`,
      },
    });
    await transporter.sendMail(mailOptions);
  },
};

export default NotiService;
