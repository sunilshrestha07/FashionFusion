import dbConnect from '@/lib/db';
import Dress from '@/models/Dress.model';
import {NextResponse} from 'next/server';

//posting dress
export async function POST(request: Request) {
  await dbConnect();
  try {
    const {name, description, price, discount, category, image, sale} = await request.json();
    if (!name || !description || !price || !discount || !category || !image || !sale) {
      return NextResponse.json({success: false, message: 'All fields are required'}, {status: 400});
    }

    const dress = new Dress({
      name,
      description,
      price,
      discount,
      category,
      image,
      sale,
    });

    await dress.save();
    return NextResponse.json({success: true, message: 'Dress added successfully', dress: dress}, {status: 200});
  } catch (error) {
    return NextResponse.json({success: false, message: error}, {status: 500});
  }
}

//fetching dress
export async function GET(request: Request) {
  await dbConnect();
  try {
    const dress = await Dress.find();
    if (!dress) {
      return NextResponse.json({success: false, message: 'Dress not found'}, {status: 404});
    }

    return NextResponse.json({success: true, dress}, {status: 200});
  } catch (error) {
    return NextResponse.json({success: false, message: 'Error fetching dress'}, {status: 500});
  }
}
