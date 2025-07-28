import {sendFCMToUser} from '@/lib/notificationSend';
import {NextResponse} from 'next/server';

export async function POST(request: Request, {params}: {params: {email: string}}) {
  const email = params.email;
  try {
    await sendFCMToUser(email, {
      title: 'Don’t forget to set your password!',
      body: 'You signed in with Google — create your own password to keep your account secure.',
    });

    return NextResponse.json({message: 'Pw change notification sent'}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Error sending pw change notificaiton'}, {status: 500});
  }
}
