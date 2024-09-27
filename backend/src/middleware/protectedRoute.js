import userModel from '../modules/user/model/user.js';
import getUserInfo from '../helpers/getUserInfo.js';
import config from '../config/index.js';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";


const protectedRoute = async (req, res, next) => {

    const incomingToken = req.cookies[config.token.name]; // dynamically get this token name...
    console.log({ incomingToken });


    // if no token present...
    if (!incomingToken) return res
        .status(httpStatus.FORBIDDEN) // 403 status code
        .json({ success: false, message: 'Unauthorized Access. JWT Token Is Required 🚫' });


    try {

        // 🔎 checking for - if some one trying to edit this token...
        const decodedInfo = jwt.verify(incomingToken, config.token.jwtSecret);


        if (!decodedInfo) return res
            .status(httpStatus.UNAUTHORIZED) // 403 status code
            .json({ success: false, message: "Unauthorized - JWT token wrong or expired 🔴" });


        const existingUser = await userModel
            .findById(decodedInfo.userId)
            .select('-password'); // remove this password field


        // ✅ store this existingUser, inside request object...
        // by this property we can track this user, inside whole application...
        req.user = getUserInfo(existingUser);


        next(); // if all OK ==> then go to requested endpoint...


    } catch (error) {

        console.log("🔴 Error in protectedRoute middleware: :- ", error);

        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({ success: false, error: error.message, message: 'Internal Server error' });
    }
}

export default protectedRoute;