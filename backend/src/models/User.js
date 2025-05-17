import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilepic: {
        type: String,
        default: ""
    },
    learninglanguage: {
        type: String,
        default: ""
    },
    nativelanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}, { timestamps: true })


schema.pre("save", async function (next) {
    try {
        if(!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
})


const user = mongoose.model("user", schema);


export default user;