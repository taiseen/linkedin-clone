import postModel from "../model/post.js";


const getPostById = async (req, res) => {

    const postId = req.params.id;

    try {
        const post = await postModel.findById(postId)
            .populate("author", "name userName profilePicture headline")
            .populate("comments.user", "name profilePicture userName headline");


        if (!post) return res
            .status(404)
            .json({ message: "Post not found 🔴" });


        res.status(200).json(post);

    } catch (error) {

        console.error("🔴 Error in getPostById controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default getPostById;