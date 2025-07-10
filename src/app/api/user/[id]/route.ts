import dbConnect from '@/lib/db';
import User from '@/models/User.model';
import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const _id = params.id;
  await dbConnect();

  try {
    const validUser = await User.findById(_id);
    if (!validUser) {
      return NextResponse.json({success: false, message: 'User not found'}, {status: 404});
    }

    const {userName, email, password, avatar} = await request.json();

    const updateFields: any = {
      userName,
      email,
      avatar,
    };

    if (password) {
      updateFields.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(_id, {$set: updateFields}, {new: true});

    return NextResponse.json({success: true, message: 'User updated successfully', user: updatedUser}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({success: false, message: `Error updating user  ${error.message}`}, {status: 500});
  }
}
