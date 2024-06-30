import mongoose from "mongoose";

interface connectionObject{
    isConnected? : number
}

const connection: connectionObject = {};


 async function dbConnect() {

    //if already connected, return
    if (connection.isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect("mongodb+srv://suneelshrestha9:socialmedia07@fashionfusion.txzfpvi.mongodb.net/?retryWrites=true&w=majority&appName=FashionFusion" || '');
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log("Error connection db:", error);
        process.exit(1)
    }
}

export default dbConnect