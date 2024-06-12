"use client"
import React,{useState , useEffect} from 'react'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
export default function  Page ()  {

    const {data : session }  = useSession()
    const router = useRouter()

    const [ShippingAddress, setShippingAddress] = useState({
        firstName : "",
        lastName : "",
        Phone : "",
        State : "",
        City : "",
        PinCode : "", 
        Address : ""
    })
    const [orderitem , setorderitem]  = useState({})

    const getProfileData = async ()=>{
      const data = {
        userEmail : session?.user?.email 
      }
      if(session?.user?.email !== undefined ){
        const response = await fetch("/api/profile"  , {method : "POST"  ,
        headers :  { 'Content-Type'  : 'application/json'  }  , body : JSON.stringify({email : session?.user?.email})})
 
       const getResponse = await response.json()
       setShippingAddress(getResponse.data)
      
      }



    }

    useEffect(()=>{
  
        const data =localStorage.getItem('CodesWearorderItem')? localStorage.getItem('CodesWearorderItem') : {} ;
        setorderitem(JSON.parse(data))
      
         
    },[])

    useEffect(() => {
      getProfileData()
    }, [session])
    

    const  handleChange = (e)=>{
        setShippingAddress({...ShippingAddress , [e.target.name]  : e.target.value})
    }

    const PlaceOrder = async()=>{
    

        
        if(  ShippingAddress.Phone.length < 9 || ShippingAddress.State.length < 5 || ShippingAddress.PinCode.length < 6 || ShippingAddress.Address.length < 10    ){
            toast.error("Enter all the Field Correctly")
            return 
          
        }

        const orderDetail = {
            shippingAddress  : ShippingAddress , 
            orderItem : orderitem
        }

        const response = await fetch("/api/order", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(orderDetail)
          })

        const data = await response.json()

        if(data.success){
          localStorage.removeItem('codesWearItem');
          localStorage.removeItem('CodesWearorderItem');

            toast.success("Order Placed Successfully !")
            router.push("/MyOrders")
            
        }
        

        
    }

    return(
        <>
      <div className="w-[80%] mx-auto mt-10 ">
        <div className ="space-y-12">
          <div className ="border-b border-gray-900/10 pb-12">
            <h2 className ="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className ="mt-1 text-sm leading-6 text-gray-600">This information will be displayed on Your Profile </p>
      
            <div className ="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className ="sm:col-span-4">
                <label for="username" className ="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className ="mt-2">
                  <div className ="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md">
                
                    <input value={session?.user?.email} type="text" name="username" id="username" autocomplete="username" className ="block flex-1 border-0 px-2  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"/>
                  </div>
                </div>
              </div>


              <div className ="sm:col-span-4">
                <label for="username" className ="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div className ="mt-2">
                  <div className ="flex px-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md">
                
                    <input value={session?.user?.username} type="text" name="username" id="username" autocomplete="username" className ="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"/>
                  </div>
                </div>
              </div>
      
          
              <div className ="col-span-full">
                <label for="photo" className ="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div className ="mt-2 flex items-center gap-x-3">
                 <img className="rounded-full w-[60px] "  src={session?.user?.image} />
                 
                </div>
              </div>
      
            
            </div>
          </div>
      
          <div className ="border-b border-gray-900/10 pb-12">
            <h2 className ="text-base font-semibold leading-7 text-gray-900">Shipping Address </h2>
            <p className ="mt-1 text-sm leading-6 text-gray-600">Use a permanent address.</p>
      
            <div className ="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className ="sm:col-span-3">
                <label for="first-name" className ="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div className ="mt-2">
                  <input value={ShippingAddress?.firstName} onChange={handleChange} type="text" name="firstName" id="firstName" autocomplete="given-name" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              
      
              <div className ="sm:col-span-3">
                <label for="last-name" className ="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <div className ="mt-2">
                  <input value={ShippingAddress?.lastName} onChange={handleChange} type="text" name="lastName" id="last-name" autocomplete="family-name" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
      
              <div className ="sm:col-span-4">
                <label for="email" className ="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className ="mt-2">
                  <input value={session?.user?.email}  id="email" name="email" type="email" autocomplete="email" className ="block px-2  w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>


              <div className ="sm:col-span-2 sm:col-start-1">
                <label for="city" className ="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                <div className ="mt-2">
                  <input type="text" value={ShippingAddress?.Phone} onChange={handleChange} name="Phone" id="phone" autocomplete="address-level2" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 px-2  shadow-sm px-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
      
              <div className ="col-span-full">
                <label for="street-address" className ="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                <div className ="mt-2">
                  <input  value={ShippingAddress?.Address} onChange={handleChange} type="text" name="Address" id="" autocomplete="street-address" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
      
              <div className ="sm:col-span-2 sm:col-start-1">
                <label for="city" className ="block text-sm font-medium leading-6 text-gray-900">City</label>
                <div className ="mt-2">
                  <input type="text" name="City"  value={ShippingAddress?.City} onChange={handleChange}  id="city" autocomplete="address-level2" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  px-2  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
              
      
              <div className ="sm:col-span-2">
                <label for="region" className ="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                <div className ="mt-2">
                  <input  value={ShippingAddress?.State} onChange={handleChange} type="text" name="State" id="State" autocomplete="address-level1" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-2  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
      
              <div className ="sm:col-span-2">
                <label for="postal-code" className ="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                <div className ="mt-2">
                  <input  value={ShippingAddress?.PinCode} onChange={handleChange} type="text" name="PinCode" id="postal-code" autocomplete="postal-code" className ="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-2  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
          </div>
    
        </div>
      
        <div className="mt-10 w-full ">
            
            
            <button onClick={PlaceOrder} className="w-full  focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900 py-2  " > Place Order </button> 
            
             </div> 
      </div>
</>      
    )

}


