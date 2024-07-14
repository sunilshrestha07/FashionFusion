import dbConnect from "@/lib/db";
import Review from "@/models/Review.model";
import { NextResponse } from "next/server";

// Fetching reviews for a specific post
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const postId = params.id;
    await dbConnect();
    try {
        const reviews = await Review.find({ postId: postId });
        if (reviews.length === 0) {
            return NextResponse.json({ success: false, message: "No reviews found for this post" }, { status: 404 });
        }
        return NextResponse.json({ success: true, reviews: reviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ success: false, message: "Error fetching reviews" }, { status: 500 });
    }
}

// Deleting a specific review
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const _id = params.id;
    await dbConnect();
    try {
        const review = await Review.findByIdAndDelete(_id);
        if (!review) {
            return NextResponse.json({ success: false, message: "review not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "review deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ success: false, message: "Error deleting review" }, { status: 500 });
    }
}
