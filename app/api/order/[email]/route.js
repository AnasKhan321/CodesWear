import { NextResponse } from 'next/server';
import ConnectToMongo from '@/Database/ConnectToMongo'
import Order  from "@/Database/Order"


export async function GET(request, context) {
    const email  = context.params.email
    const orders = await  Order.find({useremail : email })
    return NextResponse.json({ success: true   , data : orders });
}