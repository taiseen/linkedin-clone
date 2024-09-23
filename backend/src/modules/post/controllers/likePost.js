import notificationModel from "../../notification/model/notification.js";
import postModel from "../model/post.js";


const likePost = async (req, res) => {

    const postId = req.params.id;
    const userId = req.user._id;

    try {

        const existingPost = await postModel.findById(postId);

        if (existingPost.likes.includes(userId)) {
            // 👎 unlike the post
            existingPost.likes = existingPost.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            // 👍 like the post
            existingPost.likes.push(userId);

            // create a notification if the post owner is not the user who liked
            if (existingPost.author.toString() !== userId.toString()) {

                const newNotification = new notificationModel({
                    recipient: existingPost.author,
                    type: "like",
                    relatedUser: userId,
                    relatedPost: postId,
                });

                await newNotification.save();
            }
        }

        await existingPost.save();

        res.status(200).json(existingPost);

    } catch (error) {

        console.error("🔴 Error in likePost controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default likePost;