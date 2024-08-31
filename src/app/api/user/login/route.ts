import dbConnect from "@/lib/db";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request:Request) {
    await dbConnect()
    try {
        const { email, password } = await request.json();
        if(!email || !password){
            return NextResponse.json({success:false,message:"All fields are required"},{status:400})
        }

        const validUser = await User.findOne({email,isVerified:true})
        if(!validUser){
            return NextResponse.json({success:false,message:"User not found"},{status:404})
        }

        // const validPassword = bcrypt.compareSync(password,validUser.password)
        // if(!validPassword){
        //     return NextResponse.json({success:false,message:"Invalid password"},{status:400})
        // }

        const { password: pass, ...rest } = validUser.toObject();
        
        const token = jwt.sign({ userId: validUser._id}, process.env.JWT_SECRET!, { expiresIn: "20d" });
        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
            user: rest
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 200 * 60 * 60, 
        });

        return response;
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:500})
    }
    
}