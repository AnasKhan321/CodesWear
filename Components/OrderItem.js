import Image from 'next/image'



const getDate = (date)=>{
    const newD = new Date(date)
    const month = newD.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const dateString = ` ${month}  ${newD.getUTCDate()}, ${newD.getUTCFullYear()} `
    return dateString
    
}

const OrderItem = ({item})=>{
    return(
        <> 


        <div className="flex justify-between  mt-5 " >
             <h1 className="font-bold text-xl " >Order #{item._id}</h1>

            <p>Order placed  <span  className="font-bold" > { getDate( item.placedAt)}   </span>  </p>
        </div>

        <div className="border mt-5 divide-y  " >

   
   
        
            <div className="divide-y " >

                {item.orderitem.items.map((orderitem)=>{
                    return(
                        <div className="m-2 flex space-x-3   p-4  justify-between " >
                            <img src={orderitem.product.imageurl} alt={orderitem.product.desc}  className="w-[100px]" />

                            <div className="description w-[33%]   flex  flex-col space-y-3  "> 

                                <h3>{orderitem.product.Name}</h3>

                                <p>{orderitem.product.price}x{orderitem.qty}</p>

                                <p className="text-gray-400" >{orderitem.product.desc}</p>

                                
                                
                                
                                </div> 


                                <div className="flex   flex-col w-[33%] " >


                                    
                                <h3>Delivery Address </h3>

                                <p className="text-gray-400 mt-5  " >{item.shippingAddress.Address}  </p>

                                <p className="text-gray-400" > {item.shippingAddress.State }  , {item.shippingAddress.City}   </p>
 
                       


                                </div>
                            
                        </div>
                    )
                })}



            </div>




            <div className="w-[60%] mx-auto mt-10  divide-y  ">
              <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Subtotal</div>
                <div className="font-medium  ">₹{item.orderitem.totalAmount}</div>
              </div>


              {/* <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Shipping</div>
                <div className="font-medium  ">₹50</div>
              </div>



              <div className="flex justify-between p-4 ">
                <div className="text-zinc-600">Tax </div>
                <div className="font-medium  ">₹</div>
              </div>



              <div className="flex justify-between p-4 ">
                <div className="font-medium">Order Total </div>
                <div className="font-medium  ">₹{payableamount}</div>
              </div> */}

        




         </div>



            </div>
        
        
        </>
      
    )
}

export default OrderItem; 