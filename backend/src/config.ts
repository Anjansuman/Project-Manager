import * as dotenv from "dotenv";

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const SECRET_KEY = process.env.SECRET_KEY;
export const Mail = process.env.MAIL;
export const MailPassword = process.env.MAIL_PASSWORD;