"use client"
import React,{useState , useEffect} from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
function capitalizeFirstLetter(str) {
  if (str.length === 0) {
      return str; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const page = ({params}) => {
    const [data, setdata] = useState({})
    const [size, setsize] = useState([])
    const [color, setcolor] = useState([])
    const [selectedSize, setselectedSize] = useState("")
    const [selectedColor, setselectedColor] = useState("")
    const [cartItems, setcartItems] = useState([])
    const [added , setadded]  = useState(false)
    const router = useRouter();



    const addtoCart = ()=>{
    
      const item = {
        selectedColor : selectedColor , 
        selectedSize : selectedSize , 
        product : data , 
        amount : data.price, 
        qty : 1 

      }

      const items = [
        ...cartItems , 
        item
      ]
      setcartItems((prevItems) => [...prevItems, item])
      savetoLocal(items)
      router.push("/MyCart")

   
    
    }

    const savetoLocal = (item)=>{
      localStorage.setItem('codesWearItem', JSON.stringify(item));
    }

    const fetchData = async()=>{
        const id = params.id[0]
        const response =  await fetch(`/api/product/${id}`)
        const data = await response.json()
        setdata(data.data)
        setsize(data.data.Size)
        setcolor(data.data.Color)
        setselectedSize(data.data.Size[0])
        setselectedColor(data.data.Color[0])

        const items =   localStorage.getItem("codesWearItem") ? JSON.parse(localStorage.getItem("codesWearItem")) : []
      
        setcartItems(  items)
        const list = items.filter(item=> item.product._id == data.data._id)

        setadded(list.length != 0 )
      


     
    }

    useEffect(()=>{
            fetchData()
    },[])


    const handleSize= (e)=>{
      setselectedSize(e.target.value)
    }

    const handleColor=(e)=>{
      setselectedColor(e.target.value )
    }
  return (
    <> 
    
    

<div className="bg-white">
  <div className="pt-6">
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">Men</a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">{data.Category}</a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li className="text-sm">
          <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{data.Name }</a>
        </li>
      </ol>
    </nav>


    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." className="h-full w-full object-cover object-center"/>
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." className="h-full w-full object-cover object-center"/>
        </div>
        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." className="h-full w-full object-cover object-center"/>
        </div>
      </div>
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <img src={data.imageurl} alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center"/>
      </div>
    </div>

   
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.Name}</h1>
      </div>


      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">₹{data.price}</p>


        <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">

              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
              <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
            </div>
            <p className="sr-only">4 out of 5 stars</p>
            <a href="#" className="ml-3 text-sm font-medium text-pink-600 hover:text-pink-500">117 reviews</a>
          </div>
        </div>

       
      
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>

            <fieldset className="mt-4">
              <legend className="sr-only">Choose a color</legend>
              <div className="flex items-center space-x-3">

                {color.map((e)=>(
                    <label className={`relative ${e== selectedColor?"border-2 border-black" : ""} -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400`}>
                    <input type="radio" name="color-choice" value={e} className="sr-only" aria-labelledby="color-choice-0-label"  onClick={handleColor} />
                    <span id="color-choice-0-label" className="sr-only">{e}</span>
                    <span aria-hidden="true" className={`h-8 w-8  rounded-full  border-opacity-10`} style={{backgroundColor : e}}></span>
                  </label>
                ))}
          
      
             
          
              </div>
            </fieldset>
          </div>

          
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <a href="#" className="text-sm font-medium text-pink-600 hover:text-pink-500">Size guide</a>
            </div>

            <fieldset className="mt-4">
              <legend className="sr-only">Choose a size</legend>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
           
                <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
                  <input type="radio" name="size-choice" value="XXS" disabled className="sr-only" aria-labelledby="size-choice-0-label"/>
                  <span id="size-choice-0-label">XXS</span>
                  <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                    <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                      <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                    </svg>
                  </span>
                </label>


              {size.map((e)=> (
                <label  className={`group ${e== selectedSize? "border-2 border-neutral-400"  : "border"} relative flex items-center justify-center rounded-md  py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm`}>
                <input onClick={handleSize} type="radio" name="size-choice" value={e} className="sr-only" aria-labelledby="size-choice-1-label"/>
                <span id="size-choice-1-label">{e}</span>

                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
              </label>
              ))}

               

          
            
           
       
              
         
               
          
             
              </div>
            </fieldset>
          </div>

          {added? <Link href="/MyCart" className="  flex w-full items-center justify-center  px-8 py-3 mt-10  text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Cart</Link>  :  <button onClick={addtoCart} type="submit" className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent focus:outline-none text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900  px-8 py-3">Add to bag</button>   }

         
       
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
     
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{data.desc}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>
              <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>
              <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
              <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    
    </>
  )
}

export default page