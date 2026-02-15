import dbConnect from "@/lib/db";
import NewMemory from "@/models/NewMemory.model";
import { NextResponse } from "next/server";

// GET specific memory
export async function GET(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    try {
        const memory = await NewMemory.findById(id);
        if (!memory) {
            return NextResponse.json({ success: false, message: "Memory not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, memory }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error fetching memory", error }, { status: 500 });
    }
}

// DELETE specific memory
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    try {
        const deletedMemory = await NewMemory.findByIdAndDelete(id);
        if (!deletedMemory) {
            return NextResponse.json({ success: false, message: "Memory not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Memory deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error deleting memory", error }, { status: 500 });
    }
}

// PUT (Update) specific memory
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    try {
        const { title, description, images } = await request.json();

        const updatedMemory = await NewMemory.findByIdAndUpdate(
            id,
            { title, description, images },
            { new: true, runValidators: true }
        );

        if (!updatedMemory) {
            return NextResponse.json({ success: false, message: "Memory not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Memory updated successfully", memory: updatedMemory }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error updating memory", error }, { status: 500 });
    }
}
