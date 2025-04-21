"use client";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { formatVND } from "@/utils/currency";
import { OrderStatus } from "@/models/enum/OrderStatus";
import Link from "next/link";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { OrderStatus as OrderStatusType } from "@/gen/backend";
import AdminMainCard from "@/app/components/card/AdminCard";
import { getOrderStatusLabel } from "@/utils/order-utils";
export type OrderSummaryLite = {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  totalPrice: number;
  createdAt: string; // ISO string
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
};



// Xác định hành động cho phép duyệt, giao hàng, hoàn tất
const canApprove = (status: OrderSummaryLite["status"]) => {
  return status === "PENDING"; // Chỉ có thể duyệt đơn khi là PENDING
};

const canStartShipping = (status: OrderSummaryLite["status"]) => {
  return status === "PROCESSING"; // Chỉ có thể bắt đầu vận chuyển khi là PROCESSING
};

const canCompleteShipping = (status: OrderSummaryLite["status"]) => {
  return status === "SHIPPED"; // Chỉ có thể hoàn tất khi là SHIPPED
};

const canCancel = (status: OrderSummaryLite["status"]) => {
  return status === "PENDING" || status === "PROCESSING"; // Chỉ có thể hủy khi là PENDING hoặc PROCESSING
};

const mockLiteOrders: OrderSummaryLite[] = [
  {
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    phoneNumber: "0909123456",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    totalPrice: 1250000,
    createdAt: "2025-04-10T10:00:00Z",
    status: "PENDING",
  },
  {
    orderId: "ORD002",
    customerName: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "456 Trần Hưng Đạo, Hà Nội",
    totalPrice: 1980000,
    createdAt: "2025-04-15T15:30:00Z",
    status: "SHIPPED",
  },
  {
    orderId: "ORD003",
    customerName: "Lê Văn C",
    phoneNumber: "0911222333",
    address: "789 Nguyễn Huệ, Đà Nẵng",
    totalPrice: 860000,
    createdAt: "2025-04-17T08:45:00Z",
    status: "CANCELLED",
  },
];





const OrderSummaryPage = () => {
  const [orders, setOrders] = useState<OrderSummaryLite[]>([]);

  const [currentStatus, setCurrentStatus] = useState<OrderStatusType>();
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(event.target.value as OrderStatusType);
  };


  // const fetchOrderByStatus = async (status: OrderStatusType | undefined) => {
  //   try {
  //     const userOrders = await OrderControllerService.getAllOrders(status);
  //     setOrders(userOrders);
  //   } catch (error) {
  //     logger.warn(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchOrderByStatus(currentStatus);
  // }, [currentStatus]);


  useEffect(() => {
    setOrders(mockLiteOrders);
  }, []);


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
              <AdminOrderTable orders={orders} />

              {
                // Filter for each order status
                Object.entries(OrderStatus).map(([status, value]) => (
                  <OrderByStatus
                    status={status}
                    value={value}
                    handleStatusChange={handleStatusChange}
                    orders={orders}
                    key={status}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </AdminMainCard>
    </Suspense>
  );
};
const AdminOrderTable = ({ orders }: { orders: OrderSummaryLite[] }) => {
  const handleApprove = (orderId: string) => {
    toast.success(`Đơn hàng ${orderId} đã được duyệt.`);
    // Gọi API cập nhật trạng thái đơn hàng ở đây
  };

  const handleStartShipping = (orderId: string) => {
    toast.success(`Đơn hàng ${orderId} đã bắt đầu vận chuyển.`);
    // Gọi API chuyển trạng thái PROCESSING → SHIPPED
  };

  const handleCompleteShipping = (orderId: string) => {
    toast.success(`Đơn hàng ${orderId} đã được giao thành công.`);
    // Gọi API chuyển trạng thái SHIPPED → DELIVERED
  };

  const handleCancel = (orderId: string) => {
    toast.warn(`Đơn hàng ${orderId} đã bị hủy.`);
    // Gọi API hủy đơn
  };
  return (
      <div className="tab-content bg-base-100 border-base-300 p-6">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>Mã đơn</th>
          <th>Tên khách hàng</th>
          <th>SĐT</th>
          <th>Địa chỉ</th>
          <th>Ngày đặt</th>
          <th>Tổng giá</th>
          <th>Trạng thái</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>{order.customerName}</td>
            <td>{order.phoneNumber}</td>
            <td className="max-w-[250px] truncate">{order.address}</td>
            <td>{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
            <td>{formatVND(order.totalPrice)}</td>
            <td>
              <span className="badge badge-outline">{getOrderStatusLabel(order.status as OrderStatusType)}</span>
            </td>
            <td className="flex gap-2">
              <Link href={`/orders/${order.orderId}`}>
                <button className="btn btn-sm btn-outline">Chi tiết</button>
              </Link>
            </td>
            <td className="flex gap-2">

              {canApprove(order.status) && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleApprove(order.orderId)}
                >
                  Duyệt đơn
                </button>
              )}
              {canStartShipping(order.status) && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleStartShipping(order.orderId)}
                >
                  Bắt đầu vận chuyển
                </button>
              )}
              {canCompleteShipping(order.status) && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleCompleteShipping(order.orderId)}
                >
                  Giao thành công
                </button>
              )}
              {canCancel(order.status) && (
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleCancel(order.orderId)}
                >
                  Hủy đơn
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
  )
}
const OrderByStatus = ({
  status,
  value,
  orders,
  handleStatusChange,
}: {
  status: string;
  value: string;
  orders: OrderSummaryLite[];
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
