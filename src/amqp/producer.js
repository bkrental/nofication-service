var amqp = require('amqplib/callback_api');
var connectUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';


amqp.connect(connectUrl, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'notification';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});