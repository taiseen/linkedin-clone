import { mailtrapClient, sender } from "../mailtrap.config.js";
import welcomeEmail from "../template/welcomeEmail.js";
import config from "../../config/index.js";

const sendWelcomeEmail = async (newRegisteredUser, profileUrl) => {

    const { name, email, } = newRegisteredUser;

    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: config.mail.subject.welcomeEmail,
            category: config.mail.category.welcomeEmail,
            html: welcomeEmail(name, profileUrl),
        });

        console.log("Welcome Email sent successfully", response);
    } catch (error) {
        throw error;
    }
};

export default sendWelcomeEmail;