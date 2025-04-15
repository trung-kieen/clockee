"use client";
import { PageUserProductResponse } from "@/gen";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import React, { useEffect, useState } from "react";


interface MenuItemProps {
  product: PageUserProductResponse;
}


const MenuItem = ({ product }: MenuItemProps) => {
  return (
    <Link href={`/product/${product.content.i}`} passHref>
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

export default function HomePage() {
  const [products, setProducts] = useState<PageUserProductResponse | null> (null);

  useEffect(() => {
    const fertchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/products`);
        if(!res.ok) throw new Error("Không tìm được sản phẩm");
        const data = await res.json();
        setProducts(data);
        console.log(data)
      } catch (err){
        console.log("Lỗi khi fetch sản phẩm", err)
      }
    };
    fertchProduct();
  },[setProducts]);
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
          {products.map((PageUserProductResponse) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
