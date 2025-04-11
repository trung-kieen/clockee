"use client";

import PaginationControls from "@/app/components/common/PaginationController";
import {
  AdminProductControllerService,
  AdminProductResponse,
  PageAdminProductResponse,
} from "@/gen";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { mockPageResponseInfo } from "./mock-products";
import Link from "next/link";
import AdminMainCard from "@/app/components/card/AdminCard";
import PrimaryButton from "@/app/components/button/Button";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { toast } from "react-toastify";
import Thumbnail from "@/app/components/common/Thumbnail";
import { ProductImage } from "@/app/components/common/Base64Image";

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
  const dataEntries = () => {
    // Message when not found data
    if (!pageInfo?.content || pageInfo.empty) {
      return <div>Hiện tại chưa có sản phẩm nào để hiển thị.</div>;
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
                <th>ID sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá gốc</th>
                <th>Giá bán</th>
                <th>Loại</th>
                <th>Thương hiệu</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageInfo.content.map((entry, idx) => {
                return (
                  <ProductTableRow
                    key={idx}
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

  return (
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

type ProductRowProps = {
  item: AdminProductResponse;
  refreshCallBack: () => void;
};

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
  };

  return (
    <tr>
      <td>{item.productId}</td>
      <td>
        {item.image && (
          <Thumbnail className="h-24 w-24">
            <ProductImage data={item.image} />
          </Thumbnail>
        )}
      </td>
      <td>{item.name}</td>
      <td>{item.actualPrice}</td>
      <td>{item.sellPrice}</td>
      <td>{item.type}</td>
      <td>{item.brand?.name}</td>
      <td className="hover:bg-gray-200">
        <Link href={`/admin/products/${item.productId}/edit`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
      <td
        onClick={() => {
          setIsOpenConfirm(true);
        }}
        className="hover:bg-gray-200"
      >
        {/* Action delete */}
        <i className="fa fa-trash"></i>
        <ConfirmModal
          isOpen={isOpenConfirm}
          onClose={() => setIsOpenConfirm(false)}
          onConfirm={handleDelete}
          title={"Xác nhận"}
          content={"Bạn có muốn xóa nhãn hàng này?"}
        />
      </td>
    </tr>
  );
};
