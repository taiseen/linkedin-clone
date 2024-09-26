import userModel from "../../user/model/user.js";


const getUserConnections = async (req, res) => {

    const userId = req.user._id;

    try {

        const user = await userModel.findById(userId)
            .populate(
                "connections",
                "name userName profilePicture headline connections"
            );

        res.json(user.connections);

    } catch (error) {

        console.error("🔴 Error in getUserConnections controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default getUserConnections;