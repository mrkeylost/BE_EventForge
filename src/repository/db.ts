import mongoose from "mongoose";
import { env } from "../utils/env";

const connectDB = async () => {
  try {
    let dbUrl = env.DB_URL;

    await mongoose.connect(dbUrl);

    return Promise.resolve("Database Connection");
  } catch (error) {
    const err = error as unknown as Error;

    return Promise.reject(err.message);
  }
};

export default connectDB;
