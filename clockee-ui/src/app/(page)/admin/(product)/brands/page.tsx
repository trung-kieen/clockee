"use client";

import PageController from "@/app/components/common/page-controller";
import { AdminBrandControllerService, BrandDTO, PageBrandDTO } from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import CreateBrandModal from "./components/create-brand-modal";
import AdminMainCard from "@/app/components/card/admin-card";
import PrimaryButton from "@/app/components/button/button";
import DataTable from "@/app/components/common/data-table";
import Search from "@/app/components/form/search";
import { AdminRoute } from "@/app/components/route/protected";
import BrandTableRow from "./components/brand-table-row";

export default function BrandAdminPage() {
  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageBrandDTO>({} as PageBrandDTO);

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

  function onChangeSearchQuery(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  return (
    <Suspense>
      <AdminRoute>
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
            <Search value={query} onChange={onChangeSearchQuery} />

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
            <DataTable<BrandDTO>
              data={pageInfo.content || []}
              headers={["Mã thương hiệu", "Tên thương hiệu", "", ""]}
              renderRow={(item, index) => {
                return (
                  <BrandTableRow
                    key={index}
                    item={item}
                    refreshCallBack={refresh}
                  />
                );
              }}
            />

            {/*
             * Pagination controller
             */}
            <PageController
              setPage={(page: number) => {
                setPage(page);
              }}
              page={pageInfo}
            />
          </div>
        </AdminMainCard>
      </AdminRoute>
    </Suspense>
  );
}
