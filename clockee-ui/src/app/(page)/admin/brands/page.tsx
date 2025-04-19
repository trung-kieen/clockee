"use client";

import PaginationControls from "@/app/components/common/PaginationController";
import { AdminBrandControllerService, BrandDTO, PageBrandDTO } from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import { mockPageResponseInfo } from "./mock-brands";
import CreateBrandModal from "./CreateBrandModal";
import AdminMainCard from "@/app/components/card/AdminCard";
import PrimaryButton from "@/app/components/button/Button";
import BrandTableRow from "./BrandTableRow";
import DataTable from "@/app/components/common/DataTable";
import Search from "@/app/components/form/Search";

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

  function onChangeSearchQuery(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  return (
    <Suspense>
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
          <PaginationControls
            setPage={(page: number) => {
              setPage(page);
            }}
            page={pageInfo}
          />
        </div>
      </AdminMainCard>
    </Suspense>
  );
}
