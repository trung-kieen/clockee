import AdminMainCard from "@/app/components/card/AdminCard";
import React from "react";
import CreateProductForm from "./CreateProductForm";
/**
j* Page for add new product for admin
 */
const NewProductPage = ({ }) => {

  return (
    <>
      <AdminMainCard title="Sản phẩm mới" goBack={true}>
        <CreateProductForm />
      </AdminMainCard>
    </>
  );
};

export default NewProductPage;
