import dbConnect from '@/lib/db';
import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User.model';
import jwt from 'jsonwebtoken';
import {sendFCMToUser} from '@/lib/notificationSend';
import {sendOrderMail} from '@/utils/sendOrderMail';
import FcmToken from '@/models/FcmToken.model';

export async function POST(request: Request) {
  await dbConnect();

  try {
    // check if the user already exists or not

    const {userName, email, password, avatar} = await request.json();
    const userAlreadyExisits = await User.findOne({email});

    if (userAlreadyExisits) {
      const {password: pass, ...rest} = userAlreadyExisits.toObject();

      const token = jwt.sign({userId: userAlreadyExisits._id}, process.env.JWT_SECRET!, {expiresIn: '20d'});
      const response = NextResponse.json({
        message: 'Login successfully',
        success: true,
        user: rest,
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 200 * 60 * 60,
      });

      return response;
    } else {
      if (!userName || !email || !password) {
        return NextResponse.json({success: false, message: 'All fields are required'}, {status: 400});
      }

      // If the user does not exist, create a new user changes
      const newUser = new User({
        userName,
        email,
        avatar,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();
      const {password: pass, ...rest} = newUser.toObject();

      const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET!, {expiresIn: '20d'});
      const response = NextResponse.json({
        message: 'Login successfully',
        success: true,
        user: rest,
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 200 * 60 * 60,
      });

      // send the notification to the user to change the password
      // get the fcm token for that user
      const specificUser = await FcmToken.findOne(newUser._id);
      const fcmToken = specificUser.fcmToken;
      if (fcmToken !== null) {
        await sendFCMToUser(newUser._id, {
          title: 'Don’t forget to set your password!',
          body: 'You signed in with Google — create your own password to keep your account secure.',
        });
      }

      return response;

      // return NextResponse.json({success: true, message: 'User created successfully', user: newUser}, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({success: false, message: 'Error creating user', error}, {status: 500});
  }
}
