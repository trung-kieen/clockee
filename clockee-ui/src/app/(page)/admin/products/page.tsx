"use client";
import PaginationControls from "@/app/components/common/PaginationController";
import {
  AdminProductControllerService,
  AdminProductResponse,
  PageAdminProductResponse,
} from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import { mockPageResponseInfo } from "./mock-products";
import Link from "next/link";
import AdminMainCard from "@/app/components/card/AdminCard";
import PrimaryButton from "@/app/components/button/Button";
import DataTable from "@/app/components/common/DataTable";
import ProductTableRow from "./ProductTableRow";

export default function ProductAdminPage() {
  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageAdminProductResponse>(
    mockPageResponseInfo as PageAdminProductResponse,
  );

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [query, setQuery] = useState("");

  const fetchProducts = async (page: number, query: string) => {
    try {
      const pageInfo = await AdminProductControllerService.getAllProducts(
        page - 1,
        undefined,
        query,
      );
      if (pageInfo) setPageInfo(pageInfo);
      return pageInfo;
    } catch (error) {
      console.warn(error);
    }
  };

  const refresh = () => {
    fetchProducts(page, query);
  };

  /**
   * Update brand when on page change
   */
  useEffect(() => {
    fetchProducts(page, query);
  }, [page, query]);

  function onChangeSearchQuery(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  /**
   * Manager list of brands
   */

  return (
    <Suspense>
      <AdminMainCard title="Sản phẩm" goBack={false}>
        <div className="flex justify-between items-center mb-6">
          <Link href={"/admin/products/new"}>
            <PrimaryButton>
              <i className="fa fa-add"></i>
              <span>&nbsp;Thêm mới</span>
            </PrimaryButton>
          </Link>
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
           * Display list of brand
           */}
          <DataTable<AdminProductResponse>
            data={pageInfo?.content || []}
            emptyMessage="Không tìm thấy sản phẩm nào"
            headers={[
              "ID sản phẩm",
              "Hình ảnh",
              "Tên sản phẩm",
              "Giá gốc",
              "Giá bán",
              "Loại",
              "Thương hiệu",
              "",
              "",
            ]}
            renderRow={(item, index) => (
              <ProductTableRow
                key={index}
                item={item}
                refreshCallBack={refresh}
              />
            )}
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
