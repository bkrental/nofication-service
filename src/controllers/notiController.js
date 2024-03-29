const NotiService = require('../services/NotiService');
const { getTemplate } = require('../utils/getTemplate');

const NotiController = {
  sendNoti: async (req, res) => {
    const { userEmail, postTitle, userName, template } = req.body;

    const varsObj = {
      userName,
      postTitle,
    };

    const mailOptions = {
      from: "bkrental.automail@gmail.com",
      to: userEmail,
      subject: 'Notification',
      html: getTemplate(template, { userName, postTitle }),
    }

    try {
      await NotiService.sendNoti(mailOptions);
      return res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      return res.status(500).send(error);
    }
  }
}

module.exports = NotiController;