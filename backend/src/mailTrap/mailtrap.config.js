import config from "../config/index.js";
import { MailtrapClient } from "mailtrap";

// mailtrap configuration...

export const mailtrapClient = new MailtrapClient({
    endpoint: config.mail.endPoint,
    token: config.mail.token,
});


export const sender = {
    email: config.mail.sender.email,
    name: config.mail.sender.name,
};