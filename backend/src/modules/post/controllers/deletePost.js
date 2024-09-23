import cloudinary from "../../../helpers/cloudinary.js";
import postModel from "../model/post.js";


const deletePost = async (req, res) => {

    const postId = req.params.id;
    const userId = req.user._id;

    try {

        const existingPost = await postModel.findById(postId);

        if (!existingPost) return res
            .status(404)
            .json({ message: "Post not found 🔴" });


        // check if the current user is the author of the post
        if (existingPost.author.toString() !== userId.toString()) return res
            .status(403)
            .json({ message: "You are not authorized to delete this post 🔴" });


        // 🗑️ delete the image from cloudinary server also...
        if (existingPost.image) {
            const imageId = existingPost.image.split("/").pop().split(".")[0];
            
            await cloudinary.uploader.destroy(imageId);
        }


        // 🗑️ delete the post
        await postModel.findByIdAndDelete(postId);


        res.status(200).json({ message: "Post deleted successfully ✅" });

    } catch (error) {

        console.log("🔴 Error in delete post controller: ", error.message);

        res.status(500).json({ message: "Server error" });
    }
};

export default deletePost;