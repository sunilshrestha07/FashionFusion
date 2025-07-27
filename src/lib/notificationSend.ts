// lib/sendFCMNotification.ts

import * as admin from 'firebase-admin';
import FcmToken from '@/models/FcmToken.model';
import dbConnect from '@/lib/db'; // Ensure DB is connected if required

const serviceAccount = require('@/lib/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

type NotificationPayload = {
  title: string;
  body: string;
  image?: string;
};

export async function sendFCMToUser(userId: string, payload: NotificationPayload) {
  await dbConnect();

  const existingRecord = await FcmToken.findOne({userId});
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
