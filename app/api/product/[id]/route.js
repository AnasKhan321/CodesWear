import { NextResponse } from 'next/server';
import ConnectToMongo from '@/Database/ConnectToMongo'
import Product from "@/Database/Product"


export async function GET(request, context) {

    const id = context.params.id
    const data =  await Product.findOne({_id : id})
    
    return NextResponse.json({ success: true   , data : data });
}