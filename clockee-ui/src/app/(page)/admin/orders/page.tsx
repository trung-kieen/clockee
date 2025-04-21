"use client";
import { OrderStatus } from "@/models/enum/OrderStatus";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { OrderStatus as OrderStatusType } from "@/gen/backend";
import AdminMainCard from "@/app/components/card/AdminCard";
import { getOrderStatusLabel } from "@/utils/order-utils";
import { AdminOrderControllerService, AdminOrderSummaryResponse, PageResponseAdminOrderSummaryResponse } from "@/gen";
import { logger } from "@/utils/logger";
import PageController from "@/app/components/common/PaginationController";
import { useSearchParams } from "next/navigation";
import AdminOrderTable from "./AdminOrderTable";








const OrderSummaryPage = () => {

  const [currentStatus, setCurrentStatus] = useState<OrderStatusType>();
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(event.target.value as OrderStatusType);
  };

  // Get search user track page param
  const params = useSearchParams();

  // Get current page from url param
  const [page, setPage] = useState(Number(params.get("page")) || 1);


  const [pageInfo, setPageInfo] = useState<PageResponseAdminOrderSummaryResponse>(
    {} as PageResponseAdminOrderSummaryResponse,
  );

  const fetchOrderByStatus = async (status: OrderStatusType | undefined, page: number) => {
    try {
      const pageResult = await AdminOrderControllerService.getOrderSummary(status, page - 1);
      setPageInfo(pageResult);
    } catch (error) {
      logger.warn(error);
    }
  };
  useEffect(() => {
    fetchOrderByStatus(currentStatus, page);
  }, [currentStatus, page]);



  return (
    <Suspense>
      <AdminMainCard title="Thương hiệu" goBack={false}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">Danh sách đơn hàng</h1>
          <div className="container mx-auto p-10 overflow-x-auto">
            <div className="tabs tabs-lift tabs-xl">
              {/* All status order */}
              <input
                type="radio"
                name="status"
                className="tab"
                aria-label="Tất cả"
                onChange={() => {
                  setCurrentStatus(undefined);
                }}
                defaultChecked
              />
              <AdminOrderTable orders={pageInfo.content || []} />

              {
                // Filter for each order status
                Object.entries(OrderStatus).map(([status, value]) => (
                  <OrderByStatus
                    status={status}
                    value={value}
                    handleStatusChange={handleStatusChange}
                    orders={pageInfo.content || []}
                    key={status}
                  />
                ))
              }
            </div>
          </div>

        </div>
        <div className="flex justify-center">
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
};
const OrderByStatus = ({
  status,
  value,
  orders,
  handleStatusChange,
}: {
  status: string;
  value: string;
  orders: AdminOrderSummaryResponse[];
  handleStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        type="radio"
        name="status"
        className="tab"
        value={value}
        aria-label={getOrderStatusLabel(status as OrderStatusType)}
        onChange={handleStatusChange}
      />
      <AdminOrderTable key={status} orders={orders} />
    </>
  );
};

export default OrderSummaryPage;
