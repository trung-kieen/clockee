"use client"
import Image from 'next/image';
import React from 'react';


const MenuItem = () => {
  const title = "Casio world time";
  const description = " AE-1000WHD-1AVDF - Nam - Quazt (Pin)";
  const price = "1.506.000 đ";
  return (
    <>
      <div className="card bg-base-100 w-50 shadow-sm">
        <figure>
          <img
            src="product1.png"
            alt="Shoes" />
        </figure>
        <div className="card-body flex items-center justify-center">
          <b>{title}</b>
          <p>{description}</p>
          <h2 className="card-title">
            {price}
          </h2>
        </div>
      </div>

    </>
  )

}
export default function HomePage() {

  return (
    <>
      {/* Banner
      */}
      <img src="/carosel.png" width={700} height={500} className="w-full" alt="calrosel" />

      <div className='flex justify-center'>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-2/3 my-20  gap-10">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </div>

    </>
  )
}
