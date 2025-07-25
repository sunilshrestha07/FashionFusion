import mongoose from "mongoose";

const DressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default:"https://i.pinimg.com/564x/2d/04/27/2d0427c7b7e88159f228f72ce1bda32e.jpg"
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sale:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 4
    }
}, {timestamps:true});

const Dress = mongoose.models.Dress || mongoose.model("Dress", DressSchema);
export default Dress;
