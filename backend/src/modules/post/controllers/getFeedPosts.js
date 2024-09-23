import postModel from "../model/post.js";


const getFeedPosts = async (req, res) => {

    const { _id, connections } = req.user;

    try {
        const posts = await postModel.find({ author: { $in: [...connections, _id] } })
            .populate("author", "name userName profilePicture headline")
            .populate("comments.user", "name profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        console.error("🔴 Error in getFeedPosts controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default getFeedPosts;