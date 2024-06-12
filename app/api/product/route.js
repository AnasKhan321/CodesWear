import { NextResponse } from 'next/server';
import ConnectToMongo from '@/Database/ConnectToMongo'
import Product from "@/Database/Product"

ConnectToMongo()
export async function POST(request) {
    
    try {
        const formData = await request.json();
        const newProduct =  new Product(formData)
        await newProduct.save()
        return NextResponse.json({ message: 'Product created Successfully' });
    } catch (error) {

        return NextResponse.json({ error: 'Error parsing JSON body' }, { status: 400 });
    }
}



export async function GET(request){
    try {
        if(request.nextUrl.searchParams.get("q")  !== null){
            const query = request.nextUrl.searchParams.get("q")
            const products = await Product.find({
                $or: [
                  { Name: { $regex: query, $options: 'i' } }, // Case-insensitive search in Name
                  { Category: { $regex: query, $options: 'i' } }, // Case-insensitive search in Category
                ],
              })

            return NextResponse.json({data : products})
            
        }else{
            const  data = await Product.find()
            return NextResponse.json({data : data })
        }
    
        
    } catch (error) {
        
        return NextResponse.json({ error: error  }, { status: 400 });
        
    }
}