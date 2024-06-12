"use client"
import React,{useState , useEffect} from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

  const {data : session }  = useSession()
  const [cartItems, setcartItems] = useState([])
  const [payableamount, setpayableamount] = useState(0)
  const [cartEmpty , setCartEmpty]  = useState(false)
  const router = useRouter()


  const getData = ()=>{
    const items =   localStorage.getItem("codesWearItem") ? JSON.parse(localStorage.getItem("codesWearItem")) : []

    if(items.length == 0 ){
      setCartEmpty(true)
    }
    setcartItems(items)
    setTotalamount(calculateamount(items))
    setpayableamount(calculateamount(items) + calculateamount(items)*0.05 + 50 )
  }
  const [totalamount, setTotalamount] = useState(0)

  const qty = [1,2,3,4,5,6]

  useEffect(() => {
    getData()
  }, [])

 

  const placeOrder = async()=>{
      let orderItem = {
        totalAmount : payableamount.toString() , 
        items : cartItems , 
        userEmail : session.user.email , 
        user : session.user
      }
      localStorage.setItem('CodesWearorderItem', JSON.stringify(orderItem));
      router.push("/Checkout")
  }

  

  const changeQty = (qty , id)=>{
    let itemlist = cartItems.filter(item => item.product._id == id )
    let currentitemlist = cartItems.filter(item=> item.product._id !== id )
    setcartItems(currentitemlist)
    itemlist[0].qty = parseInt( qty) 
    setcartItems((prevItems) => [...prevItems, itemlist[0]])
    const savedarray = itemlist.concat(currentitemlist)
    savetoLocal(  savedarray)
    setTotalamount(calculateamount(savedarray))
    setpayableamount(calculateamount(savedarray) + calculateamount(savedarray)*0.05 + 50 )
    
  }

  const clearCart = ()=>{
    localStorage.removeItem('codesWearItem');
    localStorage.removeItem('CodesWearorderItem');

    toast("Cart clear successfully ! ")
    router.push("/")
  }

  const savetoLocal = (item)=>{
    localStorage.setItem('codesWearItem', JSON.stringify(item));
  }

  if(cartEmpty){
    return(
      <>
      <div className="mt-10  flex justify-center items-center flex-col " >
        
          <Image
            src="/cart.gif"
            alt="Picture of the author"
            width={500}
            height={500}
            quality={100}
            loading="lazy"
          />
          <div className="font-bold text-2xl animate-fadeIn " > Your Cart is Empty !</div>
        
        
        
         </div> 

   
      

      
      
       </>
    )
  }
  
  return (
    
    <> 
    <div className="container mx-auto mt-10 " >
        
        
            <h1 className="text-black font-bold text-2xl  text-center" >Shopping Cart</h1>
        

                <div className="items w-[80%] mx-auto divide-y mt-10">
                  {
                    cartItems.map((item)=>{
                      return(
                        <div className="flex py-6 p-4 border-t-2  ">
                           <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={`${item.product.imageurl}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center"/>
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <div className="w-36" >
                            <h3>
                              <a href="#">{item.product.Name}</a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{item.selectedColor.toUpperCase()}</p>
                          <p class="mt-1 text-sm text-gray-500">{item.selectedSize.toUpperCase()}</p>
                            </div>
                        
                            
                          <div class="flex flex-col items-center justify-center space-y-2 ">
                            <div>
                                <select onChange={(e)=>{
                                  changeQty(e.target.value , item.product._id)
                                }}> 
                                    <option className="px-4  mt-10 " value={item.qty}>{item.qty}</option>


                                {qty.map((qty)=>{
                                  return(
                                    <option className="px-4  mt-10 " value={qty}>{qty}</option>
                                  )
                                })} 
                              
                             

                                    
                              </select>
                            </div>
                            <button type="button" class="font-medium text-pink-600 hover:text-pink-500">Remove</button>
                          </div>
                            <p class="ml-4">₹{item.amount}</p>
                          </div>
                        

                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                       

                        </div>
                      </div>
                        </div>
                      )
                    })
                  }

                

                    </div>
         
         
         
         <div className="w-[60%] mx-auto mt-10  divide-y  ">
              <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Subtotal</div>
                <div className="font-medium  ">₹{totalamount}</div>
              </div>


              <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Shipping</div>
                <div className="font-medium  ">₹50</div>
              </div>



              <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Tax </div>
                <div className="font-medium  ">₹{parseInt(calculateamount(cartItems) * 0.05)}</div>
              </div>



              <div className="flex justify-between p-4 ">
                <div className="font-medium">Order Total </div>
                <div className="font-medium  ">₹{payableamount}</div>
              </div>

        




         </div>

         <div className="w-[60%] mx-auto " >
         <button  onClick={placeOrder} type="button" className= "  w-full  text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">CheckOut </button>

         <button  onClick={clearCart} type="button" className= "  w-full  text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Clear Cart </button>
         </div>
         
         
         </div>
         </>
  )
}

const calculateamount = (items)=>{
  let amount = 0 
  items.map((item)=>{
    amount+=parseInt(item.amount) * item.qty
  })

  return amount ; 
}

export default page