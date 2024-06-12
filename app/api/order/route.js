import { NextResponse } from 'next/server';
import ConnectToMongo from '@/Database/ConnectToMongo'
import Order from "@/Database/Order.js"; 
import Profile from "@/Database/Profile"
ConnectToMongo()
export async function POST(request) {

    try {
        const data = await request.json()
        const exsists = await Profile.findOne({email : data.orderItem.userEmail}, 
            { createdAt: 0, _id: 0, email: 0  })

            
        if(exsists == null ){
            const ProfileData = {...data.shippingAddress  , email : data.orderItem.userEmail}
            const NewProfileModel = new Profile(ProfileData)
            await NewProfileModel.save()
        }
        else{
            if(  JSON.stringify( data.shippingAddress) !==  JSON.stringify( exsists)){
                const updateProfile =  await Profile.findOneAndUpdate({email :  data.orderItem.userEmail },
                    data.shippingAddress)
            }
        }
      


        const order = new Order({ shippingAddress : data.shippingAddress , orderitem : data.orderItem   , 
            useremail : data.orderItem.userEmail 
        })
        await order.save()

        return NextResponse.json({success : true , message : "Order Placed Successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success : false , error : error})
    } 
   
}