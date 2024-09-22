const commentNotificationEmail = (recipientName, commenterName, postUrl, commentContent) => `
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>New Comment on Your Post</title>
    </head>

    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <img 
            src="https://img.freepik.com/premium-vector/linkedin-logo_578229-227.jpg" 
            style="width: 150px; margin-bottom: 20px;border-radius: 10px;"
            alt="Linkedin-Clone Logo" 
        />
        <h1 style="color: white; margin: 0; font-size: 28px;">New Comment on Your Post</h1>
    </div>

    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <p style="font-size: 18px; color: #0077B5;">
            <strong>Hello ${recipientName},</strong>
        </p>

        <p>${commenterName} has commented on your post:</p>

        <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-style: italic; margin: 0;">"${commentContent}"</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a 
                href=${postUrl} 
                style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;"
            >
                View Comment
            </a>
        </div>

        <p>Stay engaged with your network by responding to comments and fostering discussions.</p>
        <p>Best regards,<br>The Linkedin-Clone Team</p>
    </div>
    </body>

</html>
`;

export default commentNotificationEmail;