import express, { Request, Response } from "express";
import db from "./database";
import parser from "body-parser";
import dotenvFlow from "dotenv-flow";
import AmqpService from "./services/AmqpService";
import NotiService from "./services/NotiService";

dotenvFlow.config();
const app = express();

const amqpIns = AmqpService.getInstance();
amqpIns?.then((instance) => {
<<<<<<< HEAD
  instance?.startConsume("email_queue", NotiService.sendMail);
=======
  instance?.startConsume("notification", NotiService.sendMail);
>>>>>>> edf3297edf06de949cee6c06219a1e76ebb77f64
});

app.use(parser.json());
db.connect();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.listen(5000, () => {
  console.log("Notification Server is running on port 5000");
  console.log("Admin RabbitMQ Server is running on port 15672");
});
