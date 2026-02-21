// lib/sendNotification.ts
import * as admin from 'firebase-admin';
import dbConnect from '@/lib/db';
import FcmToken from '@/models/FcmToken.model';

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
      }),
    });
  }
  return admin;
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
  image?: string;
}) {
  try {
    const firebaseAdmin = getFirebaseAdmin(); // 👈 lazy init, only runs at runtime

    const response = await firebaseAdmin.messaging().send({
      token,
      notification: { title, body },
      ...(image && {
        android: { notification: { imageUrl: image } },
        apns: {
          payload: { aps: { 'mutable-content': 1 } },
          fcmOptions: { imageUrl: image },
        },
        webpush: { headers: { image } },
      }),
    });

    return { success: true, messageId: response };

  } catch (error: any) {
    const errorCode = error?.errorInfo?.code;

    if (
      errorCode === 'messaging/registration-token-not-registered' ||
      errorCode === 'messaging/mismatched-credential'
    ) {
      await dbConnect();
      console.log(`Removing invalid token: ${token}`);
      await FcmToken.deleteOne({ fcmToken: token });
    } else {
      console.error('FCM Error:', error);
    }

    return { success: false, error: error.message };
  }
}
