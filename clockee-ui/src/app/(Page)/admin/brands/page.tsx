"use client";

import PaginationControls from "@/app/components/common/PaginationController"
import { AdminBrandControllerService, PageBrandDTO } from "@/gen";
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import BrandItem from "./BrandItem";
import { mockPageResponseInfo } from "./mock-brands";
import CreateBrandModal from "./CreateBrandModal";
import Subtitle from "@/app/components/typography/SubTitle";



export default function BrandAdminPage() {

  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageBrandDTO>(mockPageResponseInfo as PageBrandDTO);

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  const fetchBrands = async () => {
    try {
      const pageInfo = await AdminBrandControllerService.getAllBrands(page - 1);
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

    fetchBrands();
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
                  <th>Brand id</th>
                  <th>Brand name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  pageInfo.content.map((entry) => {
                    return <BrandItem
                      key={entry.brandId}
                      item={entry}
                      refreshCallBack={fetchBrands} />
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

        <Subtitle styleClass={""}>Thương hiệu</Subtitle>
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsAddModalOpen(true)} className="bg-primary  text-white px-4 py-2 rounded-lg flex items-center ml-3  shadow">
            <i className="fa fa-add"></i>
            <span>&nbsp;Thêm mới</span>
          </button>
        </div>


        <div className='flex flex-col gap-2 items-center'>

          {/*
      * Add new brand button
      */}
          <CreateBrandModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            refreshCallBack={fetchBrands} />

          {/*
       * Display list of brand
       */}
          {dataEntries()}

          {/*
       * Pagination controller
       */}
          {pageInfo && pageInfo.content && <PaginationControls
            isLast={page == pageInfo.totalPages}
            isFirst={page == 1}
            pageNumber={page}
            setPage={(page: number) => { setPage(page) }}
          />}

        </div>

      </div>
    </div>
  )
}
