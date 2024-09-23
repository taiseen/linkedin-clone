import generateTokenAndSetCookie from '../token/generateTokenAndSetCookie.js';
import sendWelcomeEmail from '../../../mailTrap/email/sendWelcomeEmail.js';
import userModel from '../../user/model/user.js';
import config from '../../../config/index.js';
import httpStatus from 'http-status';
import bcryptjs from 'bcryptjs';


// ✅ Write || Create Operation
const registration = async (req, res) => {

    try {

        // ⬇️ these data come from frontend by user given input field...
        const { name, userName, email, password } = req.body;


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 1:- User existence checking... 
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        const userExistByEmail = await userModel.findOne({ email });

        if (userExistByEmail) return res
            .status(httpStatus.CONFLICT) // 409 status code
            .json({ message: 'Email already exist, you can login 🟢', success: false });


        const userExistByUserName = await userModel.findOne({ userName });

        if (userExistByUserName) return res
            .status(httpStatus.CONFLICT) // 409 status code
            .json({ message: 'Username already exists 🔴', success: false });


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        // 🟩 Step 2:- if user not exist, then start registration process...
        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

        // 📝 for password protection | Hashing System... | avoid Hashing collection also...
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt); // hash user given password...


        // TODO: upcoming time...
        // const verificationCode = Math.floor(1_00_000 + Math.random() * 9_00_000).toString();
        // const verificationCodeExpiresAt = expireTimeHour(24); // 24 hours;


        // ✅ creating new user | object data model...
        const newRegisteredUser = new userModel({
            name,
            email,
            userName,
            password: hashedPassword,

            // TODO: upcoming time...
            // verificationCode,
            // verificationCodeExpiresAt,
        });


        // ✅ save user at mongodb database...
        await newRegisteredUser.save();


        // TODO: upcoming time... take another approach...
        // jwt-token and send cookie... ==> into browser 🌐
        // generateTokenAndSetCookie(res, newRegisteredUser._id);


        // TODO: upcoming time...
        // send email verification code... ==> into user mailbox 📧
        // await sendEmailVerification(newUserRegister, verificationCode);

        const profileUrl = config.clientUrl + "/profile/" + newRegisteredUser.userName;

        if(email === 'taiseen.cse@gmail.com') await sendWelcomeEmail(newRegisteredUser, profileUrl);;


        // send user info at frontend...
        res
            .status(httpStatus.CREATED) // 201 status code
            .json({ message: "Registration successfully ✅", success: true });

    } catch (error) {

        console.log("🔴🔴🔴 Registration error:- ", error);

        res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({
                success: false,
                error: error.message,
                message: "Internal server error 🔴",
            });
    }
}


export default registration;