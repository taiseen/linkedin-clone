import connectRequestModel from "../model/connectRequest.js";

const getConnectionStatus = async (req, res) => {

    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;
    const currentUser = req.user;


    // console.log({ targetUserId });
    // console.log({ currentUserId });
    // console.log({ currentUser });

    try {

        if (currentUser.connections.includes(targetUserId)) return res
            .status(200).json({ status: "connected" });


        const pendingRequest = await connectRequestModel.findOne({
            $or: [
                { sender: currentUserId, recipient: targetUserId },
                { sender: targetUserId, recipient: currentUserId },
            ],
            status: "pending",
        });


        if (pendingRequest) {
            return pendingRequest.sender.toString() === currentUserId.toString()
                ? res.json({ status: "pending" })
                : res.json({ status: "received", requestId: pendingRequest._id });
        }

        // if no connection or pending req found
        res.json({ status: "not_connected" });

    } catch (error) {

        console.error("🔴 Error in getConnectionStatus controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default getConnectionStatus;