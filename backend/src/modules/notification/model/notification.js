import mongoose from "mongoose";
const Schema = mongoose.Schema;


const objectId = Schema.Types.ObjectId;


const notificationSchema = new Schema(
    {
        recipient: { type: objectId, ref: 'users', required: true },

        type: {
            type: String,
            required: true,
            enum: ["like", "comment", "connectionAccepted"],
        },

        relatedUser: { type: objectId, ref: 'users' },

        relatedPost: { type: objectId, ref: "post" },

        read: { type: Boolean, default: false },
    },

    { timestamps: true }
);


const notificationModel = mongoose.model("notification", notificationSchema);


export default notificationModel;
