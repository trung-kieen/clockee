import AdminMainCard from "@/app/components/card/admin-card";
import { AdminProductControllerService } from "@/gen";
import React from "react";
import EditProductForm from "./components/edit-product-form";

type EditProductPageProps = {
  params: Promise<{ id: string }>; // vì URL param luôn là string
};

async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await AdminProductControllerService.getProductById(
    Number(id),
  );

  return (
    <AdminMainCard title="CHI TIẾT SẢN PHẨM" goBack={true}>
      <EditProductForm model={product} />
    </AdminMainCard>
  );
}

export default EditProductPage;
