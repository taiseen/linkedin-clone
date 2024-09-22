import commentNotificationEmail from "../template/commentNotification.js";
import { mailtrapClient, sender } from "../mailtrap.config.js";
import config from "../../config/index.js";


const sendCommentNotificationEmail = async (
    recipientEmail,
    recipientName,
    commenterName,
    postUrl,
    commentContent
) => {

    const recipient = [{ email: recipientEmail }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: config.mail.subject.newComment,
            category: config.mail.category.commentNotification,
            html: commentNotificationEmail(recipientName, commenterName, postUrl, commentContent),
        });

        console.log("✅ Comment Notification Email sent successfully.", response);

    } catch (error) {
        throw error;
    }
};

export default sendCommentNotificationEmail;