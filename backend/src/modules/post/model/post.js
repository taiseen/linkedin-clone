import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userReference = { type: Schema.Types.ObjectId, ref: 'users' };


const postSchema = new Schema(
    {
        author: { ...userReference, required: true },

        content: { type: String },

        image: { type: String },

        likes: [{ ...userReference }],

        comments: [
            {
                content: { type: String },

                user: { ...userReference },

                createdAt: { type: Date, default: Date.now },
            },
        ],
    },

    { timestamps: true }
);


const postModel = mongoose.model('post', postSchema);


export default postModel;