"use client";

import PaginationControls from "@/app/components/common/PaginationController"
import { AdminSupplierControllerService, PageSupplierDTO } from "@/gen";
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Subtitle from "@/app/components/typography/SubTitle";
import { mockPageResponseInfo } from "./mock-supplier";
import SupplierItem from "./SupplierItem";
import CreateSupplierModal from "./CreateSupplierModal";



export default function SupplierAdminPage() {

  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageSupplierDTO>(mockPageResponseInfo as PageSupplierDTO);

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  const fetchSuppliers = async () => {
    try {
      const pageInfo = await AdminSupplierControllerService.getAllSuppliers({ page: page - 1 });
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

    fetchSuppliers();
  }, [page]);

  /**
   * Manager list of brands
   */
  const dataEntries = () => {
    // Message when not found data
    if (!(pageInfo?.content) || pageInfo.empty) {

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
                  <th>Supplier id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  pageInfo.content.map((entry) => {
                    return <SupplierItem
                      key={entry.supplierId}
                      item={entry}
                      refreshCallBack={fetchSuppliers} />
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100  p-4">
      <div className="bg-white w-full max-w-7xl min-h-[80vh] shadow-lg rounded-lg p-8">

        <Subtitle styleClass={""}>Nhà cung cấp</Subtitle>
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsAddModalOpen(true)} className="bg-primary  text-white px-4 py-2 rounded-lg flex items-center ml-3  shadow">
            <i className="fa fa-add"></i>
            <span>&nbsp;Thêm mới</span>
          </button>
        </div>


        <div className='flex flex-col gap-2 items-center'>

          {/*
      * Add new supplier button
      */}
          <CreateSupplierModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            refreshCallBack={fetchSuppliers} />

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

      </div>
    </div>
  )
}
