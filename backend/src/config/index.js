import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: isProduction
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_LOCAL,
    clientUrl: isProduction
        ? process.env.FRONTEND_LIVE_URL
        : process.env.FRONTEND_LOCALHOST_URL,

    token: {
        name: process.env.JWT_NAME,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    },

    mail: {
        endPoint: process.env.MAILTRAP_ENDPOINT,
        token: process.env.MAILTRAP_TOKEN,

        sender: {
            email: process.env.MAILTRAP_SENDER_EMAIL,
            name: process.env.MAILTRAP_SENDER_NAME,
        },

        welcomeMailTemplateUUID: process.env.MAILTRAP_WELCOME_MAIL_TEMPLATE_UUID,
        companyInfoName: process.env.MAILTRAP_COMPANY_INFO_NAME,

        subject: {
            welcomeEmail: 'Welcome to Linkedin-Clone',
            newComment: 'New Comment on Your Post',
        },

        category: {
            welcomeEmail: 'Linkedin Welcome Email',
            passwordReset: 'Password Reset Link',
            passwordResetOK: 'Password Reset Successful',
            emailVerification: 'Email Verification Code',
            connectionAccepted: 'Connection Accepted',
            commentNotification: 'Comment Notification',
        },
    },

    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        apiKey: process.env.CLOUDINARY_API_KEY,
    }
};

export default config;