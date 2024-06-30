import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import User from "@/models/User.model";
import { sendMail } from "@/utils/sendEmail";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { userName, email, password } = await request.json();
        if(!userName || !email || !password){
            return NextResponse.json({success:false,message:"All fields are required"},{status:400})
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return NextResponse.json({success:false,message:"User already exists"},{status:400})
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 

        const hashedPassword = bcrypt.hashSync(password,10);

        const user = new User({
            userName,
            email,
            password: hashedPassword,
            verificationCode: verificationCode,
            verificationExpires: Date.now() + 180000
        })

        await user.save();

        await sendMail({email,userName, verificationCode});

        return NextResponse.json({success:true,message:"User created successfully",user:user},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:"Error creating user",error},{status:500})
    }
    
}