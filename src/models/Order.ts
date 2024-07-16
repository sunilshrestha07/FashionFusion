import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    dressName: { 
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
