import connectRequestModel from "../model/connectRequest.js";


const rejectConnectionRequest = async (req, res) => {

    const { requestId } = req.params;
    const userId = req.user._id;

    try {

        const request = await connectRequestModel.findById(requestId);


        if (request.recipient.toString() !== userId.toString()) return res
            .status(403)
            .json({ message: "Not authorized to reject this request 🔴" });


        if (request.status !== "pending") return res
            .status(400)
            .json({ message: "This request has already been processed." });


        request.status = "rejected";

        await request.save();

        res.json({ message: "Connection request rejected." });

    } catch (error) {

        console.error("🔴 Error in rejectConnectionRequest controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default rejectConnectionRequest;