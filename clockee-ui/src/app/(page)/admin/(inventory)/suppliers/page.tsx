"use client";

import PageController from "@/app/components/common/page-controller";
import {
  AdminSupplierControllerService,
  PageSupplierDTO,
  SupplierDTO,
} from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import CreateSupplierModal from "./components/create-supplier-modal";
import AdminMainCard from "@/app/components/card/admin-card";
import PrimaryButton from "@/app/components/button/button";
import SupplierTableRow from "./components/supplier-table-row";
import DataTable from "@/app/components/common/data-table";
import Search from "@/app/components/form/search";

export default function SupplierAdminPage() {
  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageSupplierDTO>(
    {} as PageSupplierDTO,
  );

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [query, setQuery] = useState("");

  function onChangeSearchQuery(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  const refresh = () => {
    fetchSuppliers(page, query);
  };

  const fetchSuppliers = async (page: number, searchQuery: string) => {
    try {
      const pageInfo = await AdminSupplierControllerService.getAllSuppliers(
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
    fetchSuppliers(page, query);
  }, [page, query]);

  /**
   * Manager list of brands
   */

  return (
    <Suspense>
      <AdminMainCard title="Nhà cung cấp" goBack={false}>
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
           * Add new supplier button
           */}
          <CreateSupplierModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            refreshCallBack={refresh}
          />

          {/*
           * Display list of brand
           */}
          <DataTable<SupplierDTO>
            data={pageInfo?.content || []}
            emptyMessage="Không tìm thấy nhà cung cấp nào"
            headers={[
              "Mã nhà cung cấp",
              "Tên",
              "Địa chỉ",
              "Số điện thoại",
              "Email",
              "",
              "",
            ]}
            renderRow={(item) => (
              <SupplierTableRow
                key={item.supplierId}
                item={item}
                refreshCallBack={refresh}
              />
            )}
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
    </Suspense>
  );
}
