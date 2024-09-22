import getUserInfo from "../../../helpers/getUserInfo.js";
import userModel from "../model/user.js";


const getPublicProfile = async (req, res) => {

    const { userName } = req.params;

    try {

        const userInfoObject = await userModel.findOne({ userName }).select("-password"); // remove password field...

        if (!userInfoObject) return res
            .status(404)
            .json({ message: "User not found 🔴" });


        res.status(200).json(getUserInfo(userInfoObject));


    } catch (error) {

        console.error("🔴 Error in getPublicProfile controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};


export default getPublicProfile;