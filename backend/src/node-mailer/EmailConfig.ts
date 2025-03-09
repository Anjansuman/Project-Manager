
import nodemailer from "nodemailer";
import { Mail, MailPassword } from "../config";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: Mail,
        pass: MailPassword
    }
});