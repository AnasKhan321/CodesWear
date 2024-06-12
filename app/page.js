"use client";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShimmerFeaturedGallery } from "react-shimmer-effects";
import Productitem from "../Components/Productitem";
export default function Home() {
  const [isloading, setisloading] = useState(true);
  const [items, setitems] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/product");
    const data = await response.json();
    setitems(data.data);

    setisloading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <div className="max-w-[80vw]  mx-auto">
      {isloading && (
        <div className="flex justify-center items-center  h-[82vh]">
          <ShimmerFeaturedGallery row={2} col={2} card frameHeight={600} />
        </div>
      )}

      <div className="flex  max-w-[80vw] mx-auto flex-wrap  justify-center items-center   ">
        {items.map((item) => {
          return <Productitem item={item} />;
        })}
      </div>
    </div>
  );
}
