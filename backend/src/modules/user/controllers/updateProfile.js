import getUserInfo from "../../../helpers/getUserInfo.js";
import cloudinary from "../../../helpers/cloudinary.js";
import userModel from "../model/user.js";


const updateProfile = async (req, res) => {

	const { body, user } = req;

	const updatedInfo = {};

	const allowedFields = [
		"name", "userName", "headline", "about",
		"location", "profilePicture", "bannerImg",
		"skills", "experience", "education",
	];


	try {
		for (const propertyName of allowedFields) {

			if (body[propertyName]) { // dynamically get user input value here...
				
				// store into object for update db...
				updatedInfo[propertyName] = body[propertyName];
			}
		}


		if (body.profilePicture) {
			const result = await cloudinary.uploader.upload(body.profilePicture);

			updatedInfo.profilePicture = result.secure_url;
		}


		if (body.bannerImg) {
			const result = await cloudinary.uploader.upload(body.bannerImg);

			updatedInfo.bannerImg = result.secure_url;
		}


		const updatedUserInfo = await userModel
			.findByIdAndUpdate(user._id, { $set: updatedInfo }, { new: true })
			.select("-password");


		res.status(201).json({ user: getUserInfo(updatedUserInfo) });

	} catch (error) {

		console.error("🔴 Error in updateProfile controller: ", error);

		res.status(500).json({ message: "Server error" });
	}
};

export default updateProfile;