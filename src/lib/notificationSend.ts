import * as admin from 'firebase-admin';
import FcmToken from '@/models/FcmToken.model';
import dbConnect from '@/lib/db'; // Ensure DB is connected if required

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

type NotificationPayload = {
  title: string;
  body: string;
  image?: string;
};

export async function sendFCMToUser(email: string, payload: NotificationPayload) {
  await dbConnect();

  const existingRecord = await FcmToken.findOne({email});
  if (!existingRecord) {
    return {success: false, message: 'No FCM token found for this user'};
  }

  const token = existingRecord.fcmToken;

  const message = {
    notification: payload,
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    return {success: true, response};
  } catch (error) {
    console.error('FCM send error:', error);
    return {success: false, error};
  }
}
