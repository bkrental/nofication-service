const NotiService = require('../services/NotiService');


const NotiController = {
  sendNoti: async (req, res) => {
    const { userEmail } = req.body;
    const template = "Hello, this is a notification";

    console.log('sendNoti controller', userEmail, template);
    const mailOptions = {
      userEmail,
      template
    };

    // await NotiService.sendNoti(mailOptions);
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