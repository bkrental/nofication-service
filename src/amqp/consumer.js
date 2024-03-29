const amqplib = require('amqplib/callback_api');
const connectUrl = process.env.RABBITMQ_URL;
const NotiService = require('../services/NotiService');
const { getTemplate } = require('../utils/getTemplate');

const queue = 'notification';

const startConsummer = (queue) => {
  amqplib.connect(connectUrl, (err, connection) => {
    if (err) {
      throw err;
    }

    connection.createChannel((err1, channel) => {
      if (err1) {
        throw err1;
      }

      channel.assertQueue(queue, {
        durable: true
      });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

      channel.consume(queue, async function (msg) {
        console.log(" [x] Received:", JSON.parse(msg.content.toString()));
        const { template, userName, postTitle, userEmail } = JSON.parse(msg.content.toString());
        const mailOptions = {
          from: "bkrental.automail@gmail.com",
          to: userEmail,
          subject: 'Notification',
          html: getTemplate(template, { userName, postTitle }),
        }
        console.log(mailOptions);
        await NotiService.sendNoti(mailOptions);

      }, {
        noAck: true
      });
    });
  })
}

module.exports = { startConsummer };