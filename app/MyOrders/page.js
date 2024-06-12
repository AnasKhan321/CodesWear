"use client"
import {useState , useEffect}  from "react"; 
import { useSession } from "next-auth/react"
import OrderItem from "@/Components/OrderItem.js"
const Page = ()=>{

    const {data : session}  = useSession()
    const [orderdItems, setorderdItems] = useState([])

    const getData = async()=>{
        const response = await fetch(`/api/order/${session?.user?.email}`)
        const data = await response.json()
        setorderdItems(data.data)
    }

    useEffect(()=>{
        getData()
    },[session])


    return(
        <>
        
            <div className="mt-10 max-w-[80%]  mx-auto" >

                {
                    orderdItems.map((item)=>{
                        return(
                            <OrderItem  item={item} />
                        )
                    })
                }



            </div>
        
        </>
    )
}

export default Page ; 