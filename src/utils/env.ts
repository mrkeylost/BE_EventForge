import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;
const DB_URL: string =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/EventDB";
const SECRET: string = process.env.SECRET || "";

export const env = {
  PORT,
  DB_URL,
  SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};
