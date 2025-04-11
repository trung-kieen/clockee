import AdminMainCard from "@/app/components/card/AdminCard";
import { AdminProductControllerService } from "@/gen";
import React from "react";
import EditProductForm from "./EditProductForm";
// app/books/[id]/edit/page.tsx

type EditProductPageProps = {
  params: Promise<{ id: string }>; // vì URL param luôn là string
};

async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await AdminProductControllerService.getProductById(
    Number(id),
  );

  return (
    <AdminMainCard title="Sản phẩm mới" goBack={true}>
      <EditProductForm model={product} />
    </AdminMainCard>
  );
}

export default EditProductPage;
