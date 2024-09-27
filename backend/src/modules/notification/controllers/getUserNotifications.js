import notificationModel from "../model/notification.js";

const getUserNotifications = async (req, res) => {

    try {
        const notifications = await notificationModel.find({ recipient: req.user._id })
            .populate("relatedUser", "name userName profilePicture")
            .populate("relatedPost", "content image")
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {

        console.error("🔴 Error in getUserNotifications controller: ", error);

        res.status(500).json({ message: "Internal server error" });
    }
};

export default getUserNotifications;