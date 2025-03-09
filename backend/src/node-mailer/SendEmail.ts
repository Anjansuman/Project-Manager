import { transporter } from "./EmailConfig";
import { Mail } from "../config";


export const SendEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: Mail,
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending mail: " + error);
        return false;
    }

}