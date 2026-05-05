import dotenv from "dotenv";
import { boolean } from "yup";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5001;

const DB_URL: string =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/EventDB";

const SECRET: string = process.env.SECRET || "";

const CLIENT_HOST: string = process.env.CLIENT_HOST || "http://localhost:5002";

const EMAIL_SMTP_SECURE: boolean =
  Boolean(process.env.EMAIL_SMTP_SECURE) || false;

const EMAIL_SMTP_PASSWORD: string = process.env.EMAIL_SMTP_PASSWORD || "";

const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";

const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;

const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";

const EMAIL_SMTP_SERVICE_NAME: string =
  process.env.EMAIL_SMTP_SERVICE_NAME || "";

export const env = {
  PORT,
  DB_URL,
  SECRET,
  CLIENT_HOST,
  EMAIL_SMTP_SECURE,
  EMAIL_SMTP_USER,
  EMAIL_SMTP_PASSWORD,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_SERVICE_NAME,
  NODE_ENV: process.env.NODE_ENV || "development",
};
