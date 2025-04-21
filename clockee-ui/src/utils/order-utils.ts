import { OrderStatus } from "@/models/enum/OrderStatus";

import { OrderStatus as OrderStatusType } from "@/gen/backend";
import { AdminOrderSummaryResponse } from "@/gen";
export const orderStatusDescription = (status: string) => {
  const normalized = status?.toUpperCase();
  return Object.values(OrderStatus).find((s) => s === normalized);
};

export function getOrderStatusLabel(status: OrderStatusType): string {
  switch (status) {
    case OrderStatus.PENDING:
      return "Chờ xác nhận";
    case OrderStatus.PROCESSING:
      return "Đang xử lý";
    case OrderStatus.SHIPPED:
      return "Đang vận chuyển";
    case OrderStatus.RETURNING:
      return "Đang hoàn trả";
    case OrderStatus.RETURNED:
      return "Đã hoàn trả";
    case OrderStatus.CANCELLED:
      return "Đã hủy";
    case OrderStatus.COMPLETED:
      return "Hoàn thành";
    default:
      return "Không xác định";
  }
}

export const disableReturnOrder = (status: string) => {
  return orderStatusDescription(status) === OrderStatus.SHIPPED;
};

export const enableCancelOrder = (status: string) => {
  const normalized = orderStatusDescription(status);
  return (
    normalized === OrderStatus.PENDING || normalized === OrderStatus.PROCESSING
  );
};



// Xác định hành động cho phép duyệt, giao hàng, hoàn tất
export const canApprove = (status: AdminOrderSummaryResponse["status"]) => {
  return status === "PENDING"; // Chỉ có thể duyệt đơn khi là PENDING
};

export const canStartShipping = (status: AdminOrderSummaryResponse["status"]) => {
  return status === "PROCESSING"; // Chỉ có thể bắt đầu vận chuyển khi là PROCESSING
};

export const canCompleteShipping = (status: AdminOrderSummaryResponse["status"]) => {
  return status === "SHIPPED"; // Chỉ có thể hoàn tất khi là SHIPPED
};

export const canCancel = (status: AdminOrderSummaryResponse["status"]) => {
  return status === "PENDING" || status === "PROCESSING"; // Chỉ có thể hủy khi là PENDING hoặc PROCESSING
};
