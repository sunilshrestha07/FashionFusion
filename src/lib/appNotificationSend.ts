// lib/sendNotification.ts
import * as admin from 'firebase-admin';
import dbConnect from '@/lib/db'; // 👈 add this
import FcmToken from '@/models/FcmToken.model';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function sendAppNotification({
  token,
  title,
  body,
  image,
}: {
  token: string;
  title: string;
  body: string;
  image: string;
}) {
  try {
    const response = await admin.messaging().send({
      token,
      notification: { title, body, imageUrl: image },
    });
    return { success: true, messageId: response };

  } catch (error: any) {
    const errorCode = error?.errorInfo?.code;

    if (
      errorCode === 'messaging/registration-token-not-registered' ||
      errorCode === 'messaging/mismatched-credential'
    ) {
      await dbConnect(); // 👈 add this before DB operation
      console.log(`Removing invalid token: ${token}`);
      await FcmToken.deleteOne({ fcmToken: token });
    } else {
      console.error('FCM Error:', error);
    }

    return { success: false, error: error.message };
  }
}
