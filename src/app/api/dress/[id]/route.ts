import dbConnect from "@/lib/db";
import Dress from "@/models/Dress.model";
import { NextResponse } from "next/server";


//fetching specific dress
export async function GET(request:Request,{params}:any) {
    const _id = params.id
    await dbConnect()
    try {
        const dress = await Dress.findById(_id)
        if(!dress){
            return NextResponse.json({success:false,message:"Dress not found"},{status:404})
        }

        return NextResponse.json({success:true,dress:dress},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching dress"},{status:500})
    }
    
}


//deleting specific dress
export async function DELETE(request:Request,{params}:any) {
    const _id = params.id
    await dbConnect()
    try {
        const dress = await Dress.findByIdAndDelete(_id)
        if(!dress){
            return NextResponse.json({success:false,message:"Dress not found"},{status:404})
        }

        return NextResponse.json({success:true,message:"Dress deleted successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error fetching dress"},{status:500})
    }
    
}