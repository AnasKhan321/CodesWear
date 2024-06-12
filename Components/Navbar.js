"use client"
import {useState  , useEffect} from "react"; 
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function Navbar(){
  const [show, setshow] = useState(false)
  const { data: session } = useSession()
  const [admin, setadmin] = useState(true)
  const router = useRouter();
  const [query, setquery] = useState("")

  const LogOut = ()=>{
    signOut()
    router.push("/")
  }

  const handleQueryChange = (e)=>{
    setquery(e.target.value)
  

  }
  const onKeyDown= (e )=>{
    if(e.key == "Enter"){
      router.push(`/Search/${query}`)
    }

  }


    return(
        <>
           

<nav className="bg-white border-gray-200 shadow-lg ">
  
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

    <Link href="/"   > 
    <img src="https://www.codeswear.com/logo.png" className="w-44" alt="Flowbite Logo" />
    </Link>
    

  <div className="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input value={query} onChange={handleQueryChange} type="text" id="search-navbar" className=" text-black block w-full p-2 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search..."  onKeyDown={onKeyDown}/>
    </div>



      


   
  </div>
  <div className="flex items-center md:order-2 space-x-3 flex-col  md:space-x-0 rtl:space-x-reverse">
      
  {
        session?<button onClick={()=>{setshow(!show)}} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src={session?.user.image} alt="user photo"/>
      </button> : <div> 
            <Link href="/signin" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</Link> </div>
      }
      <div className={`z-50 bg-stone-900    ${show?"block" : "hidden"} my-4 text-base list-none  divide-y divide-gray-100 rounded-lg shadow  dark:divide-gray-600  absolute top-12  `} id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">{session?.user.username}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{session?.user.email }</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
        

          {session?.user.admin? <li>
            
            <Link href="/admin/addproduct" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">AddProduct</Link>
          </li> : <div> </div> }
          <li>
          <Link href="/MyCart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cart</Link>
          </li>
          <li>
          <Link href="/MyOrders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Order</Link>
          </li>
          <li>
            <button onClick={LogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
          </li>
        </ul>
      </div>
 
  </div>
  </div>
  
  
</nav>




        </>
    )
}