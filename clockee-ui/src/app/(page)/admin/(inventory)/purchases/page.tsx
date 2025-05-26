"use client";
import AdminMainCard from "@/app/components/card/admin-card";
import DataTable from "@/app/components/common/data-table";
import {
  AdminPurchaseControllerService,
  PageResponsePurchaseSummary,
  PurchaseSummary,
} from "@/gen";
import { usePage } from "@/lib/hooks/use-page-search";
import { logger } from "@/util/logger";
import React, { useState } from "react";
import PurchaseSummaryTableRow from "./components/purchase-summary-table-row";
import Link from "next/link";
import PrimaryButton from "@/app/components/button/button";
const PurchasesPage = () => {
  const fetchPurcharses = async () => {
    try {
      const resp = await AdminPurchaseControllerService.getPurchaseHistory();
      setPurchasetPage(resp);
    } catch (error) {
      logger.warn(error);
    }
  };

  const {
    pageInfo: purchasePage,
    setPage,
    setPageInfo: setPurchasetPage,
  } = usePage<PageResponsePurchaseSummary>({
    fetchData: fetchPurcharses,
  });
  return (
    <>
      <AdminMainCard title="Lịch sử nhập hàng">
        <Link href={"/admin/purchases/new"}>
          <PrimaryButton>
            <i className="fa fa-add"></i>
            <span>&nbsp;Nhập hàng</span>
          </PrimaryButton>
        </Link>
        <div className="text-center">
          <DataTable<PurchaseSummary>
            data={purchasePage.content || []}
            emptyMessage="Không có dữ liệu"
            headers={[
              "", // Image
              "Thời gian tạo",
              "Trạng thái",
              "Người tạo",
              "Thành tiền",
              "", // Edit
            ]}
            renderRow={(item, index) => (
              <PurchaseSummaryTableRow
                key={index}
                item={item}
                onDelete={() => {}}
                onChange={() => {}}
              />
            )}
          />
        </div>
      </AdminMainCard>
    </>
  );
};

export default PurchasesPage;
