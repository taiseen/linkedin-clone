import sendCommentNotificationEmail from "../../../mailTrap/email/sendCommentNotification.js";
import notificationModel from "../../notification/model/notification.js";
import postModel from "../model/post.js";
import config from "../../../config/index.js";


const createComment = async (req, res) => {

    const { content } = req.body;

    const postId = req.params.id;
    const userId = req.user._id;
    const userName = req.user.name;

    try {

        // 🔎🔎🔎
        const postWithNewComment = await postModel.findByIdAndUpdate(
            postId,
            { $push: { comments: { user: userId, content } } },
            { new: true }
        ).populate("author", "name email userName headline profilePicture");


        const { author } = postWithNewComment;


        // create a notification 🔔🔔🔔 
        // if the comment owner is not the post owner...
        if (author.id.toString() !== userId.toString()) {

            const newNotification = new notificationModel({
                recipient: author,
                type: "comment",
                relatedUser: userId,
                relatedPost: postId,
            });

            await newNotification.save(); // ✅✅✅

            try {
                
                const postUrl = config.clientUrl + "/post/" + postId;

                // await sendCommentNotificationEmail(
                //     author.email,
                //     author.name,
                //     userName,
                //     postUrl,
                //     content
                // );

            } catch (error) {
                console.log("🔴 Error in sending comment notification email: ", error);
            }
        }

        res.status(200).json(postWithNewComment);

    } catch (error) {

        console.error("🔴 Error in createComment controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default createComment;