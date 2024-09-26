import sendConnectionAcceptedEmail from "../../../mailTrap/email/sendConnectionAccepted.js";
import notificationModel from "../../notification/model/notification.js";
import connectRequestModel from "../model/connectRequest.js";
import userModel from "../../user/model/user.js";
import config from "../../../config/index.js";


const acceptConnectionRequest = async (req, res) => {

    const { requestId } = req.params;
    const userId = req.user._id;

    try {

        const request = await connectRequestModel.findById(requestId)
            .populate("sender", "name email userName")
            .populate("recipient", "name userName");


        if (!request) return res
            .status(404)
            .json({ message: "Connection request not found" });


        // check if the req is for the current user
        if (request.recipient._id.toString() !== userId.toString()) return res
            .status(403)
            .json({ message: "Not authorized to accept this request" });


        if (request.status !== "pending") return res
            .status(400)
            .json({ message: "This request has already been processed" });


        request.status = "accepted";
        await request.save();

        // if im your friend then ur also my friend ;)
        await userModel.findByIdAndUpdate(request.sender._id, { $addToSet: { connections: userId } });
        await userModel.findByIdAndUpdate(userId, { $addToSet: { connections: request.sender._id } });

        const notification = new notificationModel({
            recipient: request.sender._id,
            type: "connectionAccepted",
            relatedUser: userId,
        });

        await notification.save();

        res.json({ message: "Connection accepted successfully ✅" });

        const senderEmail = request.sender.email;
        const senderName = request.sender.name;
        const recipientName = request.recipient.name;
        const profileUrl = config.clientUrl + "/profile/" + request.recipient.userName;

        try {
            if(senderEmail === 'taiseen.cse@gmail.com'){
                await sendConnectionAcceptedEmail(senderEmail, senderName, recipientName, profileUrl);
            }

        } catch (error) {
            console.error("🔴 Error in sendConnectionAcceptedEmail: ", error);
        }

    } catch (error) {

        console.error("🔴 Error in acceptConnectionRequest controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default acceptConnectionRequest;