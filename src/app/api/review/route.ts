import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {comment ,userId,userName,postId,rating,userImage} = await request.json();
        if(!comment || !userId || !userName  || !postId || !rating){
            return NextResponse.json({success:false,message:"All fields are required"},{status:400})  
        }  

        const review = new Review({
            comment,
            userId,
            userName,
            postId,
            userImage,
            rating,
        })
        await review.save();
        return NextResponse.json({
            success:true,
            message:"Review posted successfully",
            review
        })

    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:500})
    }
}


