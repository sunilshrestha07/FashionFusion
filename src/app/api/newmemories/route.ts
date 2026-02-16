import dbConnect from "@/lib/db";
import NewMemory from "@/models/NewMemory.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { title, description, images } = await request.json();

        if (!title || !description || !images) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        const newMemory = new NewMemory({
            title,
            description,
            images,
        });

        await newMemory.save();

        return NextResponse.json(
            { success: true, message: "New memory created successfully", memories: [newMemory] },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error creating new memory", error },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    await dbConnect();
    try {
        const memories = await NewMemory.find();
        return NextResponse.json({ success: true, memories }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error fetching memories", error },
            { status: 500 }
        );
    }
}
