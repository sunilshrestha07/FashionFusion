import dbConnect from '@/lib/db';
import FcmToken from '@/models/FcmToken.model';
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const {email, fcmToken} = await request.json();

    if (!email || !fcmToken) {
      return NextResponse.json({message: 'All fields are required'}, {status: 400});
    }

    // Check if entry already exists
    const existingRecord = await FcmToken.findOne({email: email});

    if (!existingRecord) {
      // Create a new record
      const newRecord = new FcmToken({
        email,
        fcmToken,
      });
      await newRecord.save();

      return NextResponse.json({message: 'New FCM token created', data: newRecord}, {status: 200});
    } else {
      // Update the record - add new token if not present
      const updatedFcm = await FcmToken.updateOne({email}, {$set: {fcmToken: fcmToken}}, {new: true});
      return NextResponse.json({message: 'FCM token updated'}, {status: 200});
    }
  } catch (error) {
    console.error('[FCM_TOKEN_ERROR]', error);
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}

export async function GET() {
  await dbConnect();
  try {
    const datas = await FcmToken.find();
    if (!datas) {
      return NextResponse.json({message: 'No datas found'}, {status: 404});
    } else {
      return NextResponse.json({message: 'All the datas are:', datas}, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}
