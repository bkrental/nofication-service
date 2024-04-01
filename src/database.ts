import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  console.log("Connecting to database...");
  try {
    const connectionString = process.env.DB_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("DB_CONNECTION_STRING is not defined");
    }

    await mongoose.connect(connectionString);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database");
    console.error(error);
  }
};

export default {
  connect,
};
