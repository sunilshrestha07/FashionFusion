import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
    }
},{timestamps: true});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review