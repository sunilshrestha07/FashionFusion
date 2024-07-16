import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

//update the status of the order
export async function PUT(request: Request,{params}:{params:{id:string}}) {
    const {status}= await request.json()
    const id = params.id
    await dbConnect();
    try {
        const orders = await Order.findByIdAndUpdate(id,{
            status
        },{new:true})

        if(!orders){
            return NextResponse.json({success:false,message:"No orders found"},{status:404})
        }

        return NextResponse.json({message:"Order status updated",orders},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching orders"},{status:500})
    }
    
}