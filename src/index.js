const express = require('express');
const parser = require('body-parser');
// const cors = require('cors');
const dotenv = require('dotenv');

console.log("NODE_ENV path", `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log("SENDER_EMAIL", process.env.SENDER_EMAIL);

const app = express();
// db.connect();

app.use(parser.json());
// app.use(cors());

app.use('/notification', require('./routes/notiRoute'));


app.get("/health", (req, res) => {
  res.status(200).send("OK!");
});

app.listen(5000, (req, res) => {
  console.log('Notification Server is running on port 5000');
})