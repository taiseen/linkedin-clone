import userModel from "../../user/model/user.js";

const removeConnection = async (req, res) => {

    const { userId } = req.params;
    const myId = req.user._id;

    try {

        await userModel.findByIdAndUpdate(myId, { $pull: { connections: userId } });
        await userModel.findByIdAndUpdate(userId, { $pull: { connections: myId } });

        res.json({ message: "Connection removed successfully ✅" });

    } catch (error) {

        console.error("🔴 Error in removeConnection controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default removeConnection;