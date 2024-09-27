import notificationModel from "../model/notification.js";

const markNotificationAsRead = async (req, res) => {

	const notificationId = req.params.id;
	const userId = req.user._id;

	try {

		const notification = await notificationModel.findByIdAndUpdate(
			{ _id: notificationId, recipient: userId },
			{ read: true },
			{ new: true }
		);

		res.json(notification);

	} catch (error) {

		console.error("🔴 Error in markNotificationAsRead controller: ", error);

		res.status(500).json({ message: "Internal server error" });
	}
};

export default markNotificationAsRead;