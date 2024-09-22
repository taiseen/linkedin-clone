import userModel from "../model/user.js";


const getSuggestedConnections = async (req, res) => {

    const { _id } = req.user;

    try {

        const currentUser = await userModel.findById(_id).select("connections");

        // find users who are not already connected, 
        // and also do not recommend our own profile!!! right?
        const dbFoundingCondition = { _id: { $ne: _id, $nin: currentUser.connections } }

        const suggestedUsers = await userModel
            .find(dbFoundingCondition)
            .select("name userName profilePicture headline") // only these fields are necessary...
            .limit(3); // get only 3 users 

        // if (!suggestedUsers.length) return res.status(404).json({ message: "No user found" });

        res.status(200).json(suggestedUsers);

    } catch (error) {

        console.error("🔴 Error in getSuggestedConnections controller: ", error);

        res.status(500).json({ message: "Server error..." });
    }
};


export default getSuggestedConnections;