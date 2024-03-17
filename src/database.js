const mongoose = require('mongoose');

const connect = async () => {
  const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
  console.log('DB_CONNECTION_STRING', DB_CONNECTION_STRING);
  console.log('Connecting to database...');
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database');
    console.error(error);
  }
}

module.exports = { connect }