// app/api/notify/route.ts

import {NextResponse} from 'next/server';
import * as admin from 'firebase-admin';
import FcmToken from '@/models/FcmToken.model';

const serviceAccount = require('@/lib/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: Request, {params}: {params: {id: string}}) {
  const _id = params.id;
  const {title, body} = await req.json();

  // get the token form the fcm database
  const existingRecord = await FcmToken.findOne({userId: _id});
  if (!existingRecord) {
    return NextResponse.json({message: 'No user found in the record'});
  } else {
    // if the user is available onlye

    const tokenOfUser = existingRecord['fcmToken'];
    const message = {
      notification: {
        title,
        body,
      },
      token: tokenOfUser, // Device token from Flutter app
    };

    try {
      const response = await admin.messaging().send(message);
      return NextResponse.json({success: true, response});
    } catch (error) {
      console.error('Error sending FCM:', error);
      return NextResponse.json({success: false, error});
    }
  }
}
