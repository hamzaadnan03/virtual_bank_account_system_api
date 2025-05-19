import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async () => {
  try {
    mongoose.connection.on("conneted", () => {
      console.log("Connected to datababse successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to datababse", err);
    });

    await mongoose.connect(config.dbUrl as string);
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
};

export default connectDb;
