import notificationModel from "../model/notification.js";

const deleteNotification = async (req, res) => {

	const notificationId = req.params.id;
	const userId = req.user._id;

	try {

		await notificationModel.findOneAndDelete({ _id: notificationId, recipient: userId });

		res.json({ message: "Notification deleted successfully ✅" });

	} catch (error) {

		console.error("🔴 Error in deleteNotification controller: ", error);

		res.status(500).json({ message: "Server error" });
	}
};

export default deleteNotification;