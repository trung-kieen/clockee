"use client";
import { PageProductSummaryResponse, ProductSummaryResponse, UserProductControllerService } from "@/gen";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logger } from "@/utils/logger";
import { formatVND } from "@/utils/currency";
import { ProductImage } from "@/app/components/common/Base64Image";




const ProductSummary = ({ product }: { product: ProductSummaryResponse }) => {
  return (
    <Link href={`/product/${product.productId}`} passHref>
      <div className="card bg-base-100 w-50 shadow-sm cursor-pointer transition-transform hover:scale-105">
        <figure>
          {
            product.image && (
              <ProductImage data={product.image} className="w-full h-full object-cover" />
            )
          }
        </figure>
        <div className="card-body flex items-center justify-center text-center">
          <b>{product.name}</b>
          <h2 className="card-title">{formatVND(product.sellPrice)}</h2>
        </div>
      </div>
    </Link>
  );
};

export default function HomePage() {
  const [products, setProducts] = useState<PageProductSummaryResponse | null>(null);

  useEffect(() => {
    const fertchProduct = async () => {
      try {
        const res = await UserProductControllerService.getAllProducts1();
        setProducts(res);
      } catch (err) {
        logger.log("Lỗi khi fetch sản phẩm", err)
      }
    };
    fertchProduct();
  }, [setProducts]);
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
          {products?.content?.map((product) => (
            <ProductSummary key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
