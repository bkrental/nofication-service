const express = require('express');
const parser = require('body-parser');
// const cors = require('cors');
const dotenv = require('dotenv');
const { startConsummer } = require('./amqp/consumer');
const db = require('./database');

startConsummer('notification');

db.connect();
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("ENV path", `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// console.log("env", process.env);


const app = express();
app.use(parser.json());

app.use('/notification', require('./routes/notiRoute'));


app.get("/health", (req, res) => {
  res.status(200).send("OK!");
});

app.listen(5000, (req, res) => {
  console.log('Notification Server is running on port 5000');
  console.log('Admin RabbitMQ Server is running on port 15672')
})