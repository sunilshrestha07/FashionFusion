import dbConnect from "@/lib/db";
import User from "@/models/User.model";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
   const _id = params.id;
   await dbConnect();

   try {
      const validUser = await User.findById(_id);
      if (!validUser) {
         return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 }
         );
      }

      const { userName, email, password, avatar } = await request.json();

      const updatedUser = await User.findByIdAndUpdate(
         _id,
         {
            $set: {
               userName,
               email,
               password,
               avatar,
            },
         },
         { new: true } // This option returns the updated document
      );

      return NextResponse.json(
         { success: true, message: "User updated successfully", user: updatedUser },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         { success: false, message: "Error updating user" },
         { status: 500 }
      );
   }

}
