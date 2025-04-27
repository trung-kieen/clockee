import { ProductSummaryResponse } from "@/gen";
import React from "react";
import ProductSummaryCard from "./product-summary-card";
const ProductCollection = ({
  products,
}: {
  products: ProductSummaryResponse[];
}) => {
  return (
    products && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto">
        {products.map((product) => (
          <ProductSummaryCard key={product.productId} product={product} />
        ))}
      </div>
    )
  );
};

export default ProductCollection;
