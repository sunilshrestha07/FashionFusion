import dbConnect from "@/lib/db";
import NewMemory from "@/models/NewMemory.model";
import { NextResponse } from "next/server";
import FcmToken from "@/models/FcmToken.model";
import { sendAppNotification } from "@/lib/appNotificationSend";

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

        // 👇 Get all FCM tokens
        const existingRecords = await FcmToken.find();

        if (existingRecords.length === 0) {
            console.log('No FCM tokens found');
        } else {
            // 👇 Send notification to ALL stored tokens at once
            const notificationPromises = existingRecords.map((record) =>
                sendAppNotification({
                    token: record.fcmToken,
                    title: 'New Memory Added! 😍',
                    body: 'Your memory box just got a little more special. Open to see!',
                    image: images[0],
                })
            );

            // 👇 Wait for all notifications to be sent
            const results = await Promise.allSettled(notificationPromises);

            // 👇 Log any failed notifications
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.error(`Failed to send notification to token ${index}:`, result.reason);
                }
            });
        }

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
