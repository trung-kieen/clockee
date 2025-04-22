"use client";
import {
  PageProductSummaryResponse,
  PageResponseProductSummaryResponse,
  ProductSummaryResponse,
  UserProductControllerService,
} from "@/gen";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logger } from "@/util/logger";
import { formatVND } from "@/util/currency";
import { ProductImage } from "@/app/components/common/base-64-image";
import Thumbnail from "@/app/components/common/thumbnail";

const ProductSummary = ({ product }: { product: ProductSummaryResponse }) => {
  return (
    <Link href={`/product/${product.productId}`} passHref>
      <div className="card bg-base-100 w-50 shadow-sm cursor-pointer transition-transform hover:scale-105">
        <figure>
          {
            <Thumbnail className="h-[14rem] w-[14rem]">
              <ProductImage data={product.image} />
            </Thumbnail>
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
  const [bestSellingProducts, setBestSelingProducts] = useState<
    ProductSummaryResponse[]
  >([]);
  const [latestProducts, setLatestProduct] =
    useState<PageResponseProductSummaryResponse | null>(null);

  useEffect(() => {
    const fertchProduct = async () => {
      try {
        const bestSellingResp =
          await UserProductControllerService.getBestSellingProducts();
        setBestSelingProducts(bestSellingResp);
        const latest = await UserProductControllerService.getLatestProducts(
          0,
          8,
        );
        setLatestProduct(latest);
      } catch (err) {
        logger.log("Lỗi khi fetch sản phẩm", err);
      }
    };
    fertchProduct();
  }, [setBestSelingProducts]);
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
      <div className="lg:w-3/4 mx-auto">
        <h3 className="text-2xl font-bold text-left p-10">Sản phẩm mới nhất</h3>
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-2/3 my-20  gap-10">
            {latestProducts?.content?.map((product) => (
              <ProductSummary key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-3/4 mx-auto">
        <h3 className="text-2xl font-bold text-left p-10">Sản phẩm bán chạy</h3>
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-2/3 my-20  gap-10">
            {bestSellingProducts.map((product) => (
              <ProductSummary key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
