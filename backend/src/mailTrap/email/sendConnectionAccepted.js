import connectionAcceptedEmail from "../template/connectionAccepted.js";
import { mailtrapClient, sender } from "../mailtrap.config.js";
import config from "../../config/index.js";


const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {

    const recipient = [{ email: senderEmail }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: `${recipientName} accepted your connection request. 🎉`,
            html: connectionAcceptedEmail(senderName, recipientName, profileUrl),
            category: config.mail.category.connectionAccepted,
        });

        console.log("✅ Connection Accepted Email sent successfully.", response);

    } catch (error) {
        throw error;
    }
};

export default sendConnectionAcceptedEmail;