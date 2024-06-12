"use client"
import {useState , useEffect} from "react"; 
import Productitem from "@/Components/Productitem";

export default function page({params}){

    const [products, setproducts] = useState([])
    const getData  = async()=>{
        const response = await fetch(`/api/product/?q=${params.query}`)
        const data = await response.json()
        setproducts(data.data)
        
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <div>
            
                <div className="flex  max-w-[80vw] mx-auto flex-wrap  justify-center items-center  " >
                    
                    {
                        products.map((item)=>{
                            return(
                                <Productitem item={item} />
                            )
                        })
                    }

                </div>    
            
            
        </div>
    )
}