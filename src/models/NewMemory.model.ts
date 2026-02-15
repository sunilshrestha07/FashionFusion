import mongoose from "mongoose";

const NewMemorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    }
}, { timestamps: true });

const NewMemory = mongoose.models.NewMemory || mongoose.model("NewMemory", NewMemorySchema);
export default NewMemory;
