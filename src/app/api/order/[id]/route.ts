import dbConnect from '@/lib/db';
import {sendFCMToUser} from '@/lib/notificationSend';
import Order from '@/models/Order';
import {NextResponse} from 'next/server';

//update the status of the order
export async function PUT(request: Request, {params}: {params: {id: string}}) {
  const {status} = await request.json();
  const id = params.id;
  await dbConnect();
  try {
    // get the user id of that particular order
    const specificOrder = await Order.findOne({_id: id});
    if (!specificOrder) {
      return NextResponse.json({success: false, message: 'No orders found'}, {status: 404});
    } else {
      const email = specificOrder['userEmail'];
      const orders = await Order.findByIdAndUpdate(
        id,
        {
          status,
        },
        {new: true}
      );

      if (!orders) {
        return NextResponse.json({success: false, message: 'No orders found'}, {status: 404});
      }

      await sendFCMToUser(email, {title: 'Order Status Update', body: `Good news! Your delivery status changed to ${status}`});
      return NextResponse.json({message: 'Order status updated', orders}, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({success: false, message: 'Error fetching orders'}, {status: 500});
  }
}
