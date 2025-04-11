"use client";
import Link from "next/link";
import React from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
}

interface MenuItemProps {
  product: Product;
}

const products: Product[] = [
  {
    id: 1,
    title: "Casio World Time",
    description: "AE-1000WHD-1AVDF - Nam - Quartz (Pin)",
    price: "1.506.000 đ",
  },
  {
    id: 2,
    title: "Casio Vintage",
    description: "A168WG-9WDF - Nam - Quartz (Pin)",
    price: "1.300.000 đ",
  },
  {
    id: 3,
    title: "Casio Standard",
    description: "MW-240-1EVDF - Nam - Quartz (Pin)",
    price: "800.000 đ",
  },
  {
    id: 4,
    title: "Casio G-Shock",
    description: "GA-2100-1A1DR - Nam - Quartz (Pin)",
    price: "2.500.000 đ",
  },
  {
    id: 5,
    title: "Casio Edifice",
    description: "EFR-539D-1A2V - Nam - Quartz (Pin)",
    price: "3.200.000 đ",
  },
  {
    id: 6,
    title: "Casio ProTrek",
    description: "PRG-240-1DR - Nam - Quartz (Pin)",
    price: "4.800.000 đ",
  },
];

const MenuItem = ({ product }: MenuItemProps) => {
  return (
    <Link href={`/user/product/${product.id}`} passHref>
      <div className="card bg-base-100 w-50 shadow-sm cursor-pointer transition-transform hover:scale-105">
        <figure>
          <img src="/product1.png" alt={product.title} />
        </figure>
        <div className="card-body flex items-center justify-center text-center">
          <b>{product.title}</b>
          <p>{product.description}</p>
          <h2 className="card-title">{product.price}</h2>
        </div>
      </div>
    </Link>
  );
};
// const MenuItem = () => {
//   const title = "Casio world time";
//   const description = " AE-1000WHD-1AVDF - Nam - Quazt (Pin)";
//   const price = "1.506.000 đ";
//   return (
//     <>
//       <div className="card bg-base-100 w-50 shadow-sm">
//         <figure>
//           <img
//             src="product1.png"
//             alt="Shoes" />
//         </figure>
//         <div className="card-body flex items-center justify-center">
//           <b>{title}</b>
//           <p>{description}</p>
//           <h2 className="card-title">
//             {price}
//           </h2>
//         </div>
//       </div>

//     </>
//   )
// }

export default function HomePage() {
  return (
    <>
      {/* Banner
       */}
      <img
        src="/carosel.png"
        width={700}
        height={500}
        className="w-full"
        alt="calrosel"
      />
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-2/3 my-20  gap-10">
          {products.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
