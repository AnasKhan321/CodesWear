import { NextResponse } from 'next/server';
import ConnectToMongo from '@/Database/ConnectToMongo'
import Profile from "@/Database/Profile"


export async function POST(request){
    try {
       
        const data = await request.json()
        const ProfileData = await Profile.findOne({email : data.email}  , { createdAt: 0, _id: 0, email: 0 })
        
        return NextResponse.json({success : true  , data : ProfileData })
    
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error  }, { status: 400 });
        
    }
}



