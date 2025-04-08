"use client";

import PaginationControls from "@/app/components/common/PaginationController"
import { AdminProductControllerService, AdminProductRequest, AdminProductResponse, PageAdminProductResponse } from "@/gen";
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { mockPageResponseInfo } from "./mock-products";
import Link from "next/link";
import AdminMainCard from "@/app/components/card/AdminCard";
import PrimaryButton from "@/app/components/button/Button";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { toast } from "react-toastify";
import ProductThumbnail from "@/app/components/product/ProductThumbnail";
import Thumbnail from "@/app/components/common/Thumbnail";



export default function ProductAdminPage() {

  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageAdminProductResponse>(mockPageResponseInfo as PageAdminProductResponse);

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);



  const fetchProducts = async () => {
    try {
      const pageInfo = await AdminProductControllerService.getAllProducts(page - 1);
      if (pageInfo)
        setPageInfo(pageInfo)
      return pageInfo;
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * Update brand when on page change
   */
  useEffect(() => {
    fetchProducts();
  }, [page]);

  /**
   * Manager list of brands
   */
  const dataEntries = () => {
    // Message when not found data
    if (!(pageInfo?.content) || pageInfo.empty) {

      console.log("No such data")
      return (
        <div>No brand found</div>
      )
    }
    return (
      (
        <div>

          {/**
           * Display brand list using pure table
           */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th >productId</th>
                  <th >preview</th>
                  <th >name</th>
                  <th >actualPrice</th>
                  <th >sellPrice</th>
                  <th >type</th>
                  <th >brandName</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  pageInfo.content.map((entry, idx) => {
                    return <ProductTableRow
                      key={idx}
                      item={entry} refreshCallBack={function(): void {
                        throw new Error("Function not implemented.");
                      }} />
                  })
                }
              </tbody>
            </table>
          </div>


        </div >
      )
    )
  }

  return (

    <AdminMainCard title="Sản phẩm">
      <div className="flex justify-between items-center mb-6">
        <Link href={"/admin/products/new"}>
          <PrimaryButton>
            <i className="fa fa-add"></i>
            <span>&nbsp;Thêm mới</span>
          </PrimaryButton>
        </Link>
      </div>


      <div className='flex flex-col gap-2 items-center'>


        {/*
       * Display list of brand
       */}
        {dataEntries()}

        {/*
       * Pagination controller
       */}
        {pageInfo && pageInfo.content && <PaginationControls
          isLast={page >= Number(pageInfo.totalPages)}
          isFirst={page == 1}
          pageNumber={page}
          setPage={(page: number) => { setPage(page) }}
        />}

      </div>

    </AdminMainCard>
  )
}


type ProductRowProps = { item: AdminProductResponse, refreshCallBack: () => void };

const ProductTableRow = ({ item, refreshCallBack }: ProductRowProps) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);


  const handleDelete = async () => {
    if (!item.productId) {
      return;
    }
    try {
      await AdminProductControllerService.deleteProduct(item.productId);
      setIsOpenConfirm(false);
      refreshCallBack();
      toast("Xóa thành công");
    } catch (e) {
      toast(e as string);
    }
  }

  return (
    <tr >

      <td >{item.productId}</td>
      <td >
        {

          item.image && (
            <Thumbnail >
              <img src={`data:image/png;base64,${item.image}`} />
            </Thumbnail>
          )
        }
      </td>
      <td >{item.name}</td>
      <td >{item.actualPrice}</td>
      <td >{item.sellPrice}</td>
      <td >{item.type}</td>
      <td >{item.brandName}</td>
      <td className="hover:bg-gray-200">
        <Link href={`/admin/products/${item.productId}/edit`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
      <td onClick={() => { setIsOpenConfirm(false) }} className="hover:bg-gray-200">
        {/* Action delete */}
        <i className="fa fa-trash"></i>
        <ConfirmModal
          isOpen={isOpenConfirm}
          onClose={() => { setIsOpenConfirm(false) }}
          onConfirm={handleDelete}
          title={""} content={""} />
      </td>
    </tr>
  )

}
