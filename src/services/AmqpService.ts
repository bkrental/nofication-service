import amqplib, { Channel } from "amqplib";
import NotiService from "../services/NotiService";
import getTemplate from "../utils/getTemplate";

class AmqpService {
  static instance: AmqpService | null = null;
  channel: Channel;

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
      await channel.assertQueue(queue, {
        durable: true,
      });

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

  public async startConsume(queueName: string, handleMsg: (msg: any) => void) {
    try {
      if (!this.channel) {
        throw new Error("Channel is not initialized");
      }
      await this.channel.consume(queueName, handleMsg, { noAck: true });
    } catch (error) {
      console.log("Error sending email");
      console.error(error);
    }
  }
}

export default AmqpService;
