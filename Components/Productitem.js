import Link from "next/link";

export default function Productitem({ item }) {


  return (
    <>
      <Link href={`/product/${item._id}`}>
        <div className="bg-white  m-2   ">
          <div className="mx-auto  px-2  py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 gap-x-6 gap-y-10    xl:gap-x-8">
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.imageurl}
                    alt="Front of men&#039;s Basic Tee in black."
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {item.Name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.Color[0].toUpperCase()}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
