import React from 'react';
import { FaRupeeSign } from "react-icons/fa";


export default function ItemsList({user}) {
  return (
   <div 
  //  className="flex flex-col lg:flex-row gap-5 items-center"
  className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4'
   >
  {user &&
    user.items?.map((item, index) => (
      <div
        key={index}
        className="bg-white h-[200px] text-black shadow-md rounded-lg p-6 w-72 text-center hover:shadow-lg transition duration-300 ease-in-out overflow-y-scroll"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{item.name}</h2>
        <h3 className="text-2xl font-semibold text-green-600 mb-2">
          {item.price}
          <FaRupeeSign className="inline mr-1" />
        </h3>
        <span className="inline-block bg-gray-200 text-gray-600 text-sm font-medium px-3 py-1 rounded-full mb-3">
          {item.tag}
        </span>
        <p className="text-gray-700 text-sm">
          {item.description}
        </p>
      </div>
    ))}
</div>


  );
}
