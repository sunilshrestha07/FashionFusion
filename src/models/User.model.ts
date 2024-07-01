import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: true
    },
    verificationExpires: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/564x/0e/0e/b3/0e0eb3f44a6819411c4ef01b22881c47.jpg"
    }
},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User