import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import SessionWrapper from '@/Components/SessionWrapper'
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: "CodesWear",
  description: "Buy Your Favourite T-Shirts ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <SessionWrapper> 
      <body className={inter.className}>
        <Navbar/>
        <ToastContainer/>
        <div className="min-h-[82vh] ">
        {children}
        </div>
        
     
        <Footer/>

        
        </body>
        </SessionWrapper>
    </html>
  );
}
