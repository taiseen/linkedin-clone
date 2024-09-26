import connectRequestModel from "../model/connectRequest.js";


const getConnectionRequests = async (req, res) => {

    const userId = req.user._id;

    try {

        const requests = await connectRequestModel.find({ recipient: userId, status: "pending" })
            .populate(
                "sender",
                "name userName profilePicture headline connections"
            );

        res.json(requests);

    } catch (error) {
        
        console.error("🔴 Error in getConnectionRequests controller: ", error);
        
        res.status(500).json({ message: "Server error" });
    }
};

export default getConnectionRequests;