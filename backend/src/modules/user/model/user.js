import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 2,
            max: 40,
        },

        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            max: 50,
        },

        password: {
            type: String,
            required: true,
            max: 40,
            min: 6,
        },

        profilePicture: { type: String, default: "" },

        bannerImg: { type: String, default: "" },

        headline: { type: String, default: "Linkedin User" },

        location: { type: String, default: "Earth" },

        about: { type: String, default: "" },

        skills: [String],

        experience: [
            {
                title: String,
                company: String,
                startDate: Date,
                endDate: Date,
                description: String,
            },
        ],

        education: [
            {
                school: String,
                fieldOfStudy: String,
                startYear: Number,
                endYear: Number,
            },
        ],

        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
        ],

        // role: {
        //     type: String,
        //     enum: ["admin", 'user'],
        //     default: 'user',
        // },

        lastLogin: { type: Date, default: Date.now },

        isVerified: { type: Boolean, default: false },

        verificationCodeExpiresAt: Date,
        verificationCode: String,

        resetPasswordExpiresAt: Date,
        resetPasswordToken: String,
    },

    { timestamps: true }
);


const userModel = mongoose.model('users', userSchema);

export default userModel;