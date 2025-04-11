"use client";

import PaginationControls from "@/app/components/common/PaginationController";
import { AdminBrandControllerService, PageBrandDTO } from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { mockPageResponseInfo } from "./mock-brands";
import CreateBrandModal from "./CreateBrandModal";
import AdminMainCard from "@/app/components/card/AdminCard";
import PrimaryButton from "@/app/components/button/Button";
import BrandTableRow from "./BrandTableRow";

export default function BrandAdminPage() {
  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageBrandDTO>(
    mockPageResponseInfo as PageBrandDTO,
  );

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [query, setQuery] = useState("");

  const refresh = () => {
    fetchBrands(page, query);
  };

  const fetchBrands = async (page: number, searchQuery: string) => {
    try {
      const pageInfo = await AdminBrandControllerService.getAllBrands(
        page - 1,
        undefined,
        searchQuery,
      );
      if (pageInfo) setPageInfo(pageInfo);
      return pageInfo;
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Update brand when on page change
   */
  useEffect(() => {
    fetchBrands(page, query);
  }, [page, query]);

  /**
   * Manager list of brands
   */
  const dataEntries = () => {
    // Message when not found data
    if (!pageInfo?.content || pageInfo.empty) {
      console.log("No such data");
      return <div>No brand found</div>;
    }
    return (
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
              {pageInfo.content.map((entry) => {
                return (
                  <BrandTableRow
                    key={entry.brandId}
                    item={entry}
                    refreshCallBack={refresh}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  function onChangeSearchQuery(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  return (
    <AdminMainCard title="Thương hiệu" goBack={false}>
      <div className="flex justify-between items-center mb-6">
        <div onClick={() => setIsAddModalOpen(true)}>
          <PrimaryButton>
            <i className="fa fa-add"></i>
            <span>&nbsp;Thêm mới</span>
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        {/*
         * Search filter
         */}
        <div className="relative flex items-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            value={query}
            onChange={onChangeSearchQuery}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Tìm kiếm"
          />
        </div>

        {/*
         * Add new brand button
         */}
        <CreateBrandModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          refreshCallBack={refresh}
        />

        {/*
         * Display list of brand
         */}
        {dataEntries()}

        {/*
         * Pagination controller
         */}
        {pageInfo && pageInfo.content && (
          <PaginationControls
            isLast={page >= Number(pageInfo.totalPages)}
            isFirst={page == 1}
            pageNumber={page}
            setPage={(page: number) => {
              setPage(page);
            }}
          />
        )}
      </div>
    </AdminMainCard>
  );
}
