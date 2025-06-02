"use client";
import React, { useEffect, useState } from "react";
import AdminMainCard from "@/app/components/card/admin-card";
import axios from "axios";
import {
  AdminProductControllerService,
  AdminProductResponse,
  AdminUserControllerService,
  UserProductControllerService,
} from "@/gen";
import { logger } from "@/util/logger";
import { useSearchParams } from "next/navigation";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";
import EditProductForm from "./components/edit-product-form";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};
function EditProductPage() {
  const params = useSearchParams();
  const [product, setProduct] = useState<AdminProductResponse>();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await AdminProductControllerService.getProductById(1);
        setProduct(res);
      } catch (error) {
        logger.warn(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <AdminMainCard title="Sản phẩm mới" goBack={true}>
      {product && <EditProductForm model={product} />}
    </AdminMainCard>
  );
}

export default EditProductPage;
