import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userReference = { type: Schema.Types.ObjectId, ref: 'users', required: true };


const connectRequestSchema = new Schema(
    {
        sender: { ...userReference },

        recipient: { ...userReference },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },

    { timestamps: true }
);


const connectRequestModel = mongoose.model("connectRequest", connectRequestSchema);


export default connectRequestModel;
