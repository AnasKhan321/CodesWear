"use client"
import React , {useState  ,useRef} from 'react'
import { toast } from 'react-toastify';

const page = () => {
  
  
  const myRef = useRef(null);
  const [color, setcolor] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [colortext, setcolortext] = useState("")
  const [sizetext, setsizetext] = useState("")
  const [size , setsize]  = useState([])
  const [Form , setForm]   = useState({
    Name : "",
    desc : "",
    availabelQty : 0 , 
    price : 0 , 
    Category : "",
    imageurl : ""

  })

  const onChange = (e)=>{
    setForm({...Form , [e.target.name]  : e.target.value})
  }

  const handleFileChange = (event) => {
    // Access the uploaded file
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files)

  };


  const handleFormSubmit = async(e)=>{
    e.preventDefault()
  
 
   
    const newFrom = {...Form ,  Color : color , Size : size}
    console.log(newFrom)


    const response = await fetch("/api/product"  , {  
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body:  JSON.stringify(newFrom )
      }
      )

    const data = await response.json()
    console.log(data)
    if(response.ok){
      setForm({
        Name : "",
        desc : "",
        availabelQty : 0 , 
        price : 0 , 
        Category : "",
        imageurl : ""
      })
      setcolor([])
      setsize([])
      toast.success("Product Added Successfully")
      
    }
 



    myRef.current.reset()
  }

  const handlecolorchange = (e)=>{
    setcolortext(e.target.value)
      if(e.keyCode == 13){
        const updatedColor = [...color, colortext];
    
        setcolor(updatedColor)
        setcolortext("")
      }
  }

  const handlesizechange = (e)=>{
      setsizetext(e.target.value)
      if(e.keyCode == 13){
        const updatedSize = [...size , sizetext]
        setsize(updatedSize)
        setsizetext("")
      }
  }


  return (
    <> 
    
    
    

<form className="w-3/6 mx-auto mt-10 space-y-11  " onSubmit={handleFormSubmit}  ref={myRef}>
  <div className="relative z-0 w-full mb-5 group">
      <input value={Form.Name} onChange={onChange} type="text" name="Name" id="Name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
      <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input  value={Form.desc} onChange={onChange} type="text" name="desc" id="desc" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input  type="text" name="Color" id="Color" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " onKeyDown={handlecolorchange}    value={colortext} onChange={handlecolorchange}/>
      <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Color</label>
  </div>


  <div className="relative z-0 w-full mb-5 group">
      <input  type="text" name="imageurl" id="imageurl" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "    value={Form.imageurl} onChange={onChange}/>
      <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ImageUrl</label>
  </div>

  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input value={Form.availabelQty} onChange={onChange} type="Number" name="availabelQty" id="availabelQty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
        <label for="availableQty" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Available Qty </label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input value={Form.price} onChange={onChange} type="Number" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
        <label for="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
    </div>
  </div>






  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="Size" id="Size" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  value={sizetext}  onChange={handlesizechange}  onKeyDown={handlesizechange}   />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  
      >Size </label>
    </div>





    <div className="relative z-0 w-full mb-5 group">
        <input value={Form.Category} onChange={onChange} type="text" name="Category" id="Category" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
    </div>
  </div>

  <button type="submit" className=" w-full mx-auto  text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add</button>
</form>


<div className="w-3/6 mx-auto  mt-8  "> 

<div className="colors"> 

<h1 className="font-bold text-xl ">  Colors :  </h1>

<div className="flex  ">
    {color.map((e)=>{
      return(
        <div className="p-2 " > {e} </div>
      )
    })}
</div>


</div>


<div> 
<h1 className="font-bold text-xl ">  Size :  </h1>

<div className="flex ">
  
{size.map((e)=>{
  return(
    <div className="p-2" > {e} </div>
  )
})}
  
   </div>

</div>




</div>


    
    
    </>
  )
}

export default page