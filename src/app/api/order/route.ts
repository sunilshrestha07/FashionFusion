import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { sendOrderMail } from "@/utils/sendOrderMail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { userId, dressName, totalPrice, quantity, userName, userEmail ,status} = await request.json(); 

        if (!userId || !dressName || !totalPrice || !quantity || !userName || !userEmail) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const order = new Order({
            userId,
            dressName,
            totalPrice,
            quantity,
            userName,
            userEmail,
            status
        });

        await sendOrderMail({ userEmail, userName, dressName });
        await order.save();
        return NextResponse.json({ success: true, message: "Order created successfully", order: order }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error creating order", error }, { status: 500 });
    }
}


//fetch orders
export async function GET(request: Request) {
    await dbConnect();
    try {
        const orders = await Order.find()
        if(!orders){
            return NextResponse.json({success:false,message:"No orders found"},{status:404})
        }

        return NextResponse.json({orders},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching orders"},{status:500})
    }
    
}

