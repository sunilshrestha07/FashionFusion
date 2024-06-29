import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Perform any necessary operations for POST method
    return NextResponse.json({ success: true, message: "This is a POST request test" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing POST request" }, { status: 500 });
  }
}
