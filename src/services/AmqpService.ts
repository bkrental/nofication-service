import amqplib, { Channel } from "amqplib";
import NotiService from "../services/NotiService";
import getTemplate from "../utils/getTemplate";

class AmqpService {
  static instance: AmqpService | null = null;
  channel: Channel;
  retryCount: number = 0;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  public static async init(queue: string) {
    try {
      const rabbitmqUrl = process.env.RABBITMQ_URL;
      if (!rabbitmqUrl) {
        throw new Error("RABBITMQ_URL environment variable is not defined.");
      }
      const connection = await amqplib.connect(rabbitmqUrl);
      const channel = await connection.createChannel();

      // declare exchange
      const my_exchange = `my_exchange`;
      await channel.assertExchange(my_exchange, "direct", { durable: true });

      // declare queues
      const email_queue = `email_queue`;
      const delay_queue = `delay_queue`;
      const dlx_queue = `dlx_queue`;

      // assert queues
      await channel.assertQueue(delay_queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": my_exchange,
          "x-dead-letter-routing-key": "",
          "x-message-ttl": 5000,
        },
      });

      await channel.assertQueue(email_queue, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": my_exchange,
          "x-dead-letter-routing-key": delay_queue,
        },
      });

      await channel.assertQueue(dlx_queue, {
        durable: true,
      });

      // bind queues to exchange
      await channel.bindQueue(email_queue, my_exchange, "");
      await channel.bindQueue(delay_queue, my_exchange, delay_queue);
      await channel.bindQueue(dlx_queue, my_exchange, dlx_queue);

      return new AmqpService(channel);
    } catch (error) {
      console.error("Error connecting to RabbitMQ");
      console.error(error);
    }
  }

  public static async getInstance() {
    if (!AmqpService.instance) {
      const instance = await AmqpService.init("notification");
      AmqpService.instance = instance || null;
    }
    return this.instance;
  }

  public async startConsume(
    queueName: string,
    handleMsg: (msg: any) => Promise<void>
  ) {
    try {
      if (!this.channel) {
        throw new Error("Channel is not initialized");
      }
      await this.channel.consume(
        queueName,
        async (msg) => {
          try {
            if (!msg) {
              throw new Error("Message is empty");
            }
            console.log("startHandleMsg");
            await handleMsg(msg);
            this.channel.ack(msg);
          } catch (error) {
            console.error("Error consuming message");
            console.error(error);
            if (this.retryCount < 5) {
              this.retryCount++;
              return this.channel.nack(msg!, false, true);
            } else {
              this.retryCount = 0;
              this.channel.ack(msg!);
              const dlx_routing_key = "dlx_queue"; // specify the dead-letter routing key
              this.channel.publish(
                "my_exchange",
                dlx_routing_key,
                msg?.content as Buffer
              );
            }
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error("Error starting to consume message");
      console.error(error);
    }
  }
}

export default AmqpService;
