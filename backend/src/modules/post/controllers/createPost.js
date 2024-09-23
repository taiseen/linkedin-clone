import cloudinary from "../../../helpers/cloudinary.js";
import postModel from "../model/post.js";


const createPost = async (req, res) => {

    const { _id } = req.user;
    const { content, image } = req.body;

    try {

        let newPost;

        if (image) {

            const imgResult = await cloudinary.uploader.upload(image);

            newPost = new postModel({ author: _id, content, image: imgResult.secure_url });

        } else {
            newPost = new postModel({ author: _id, content });
        }

        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {

        console.error("🔴 Error in createPost controller: ", error);

        res.status(500).json({ message: "Server error" });
    }
};

export default createPost;