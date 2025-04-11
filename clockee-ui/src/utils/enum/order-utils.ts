import { OrderStatus } from "@/enum/OrderStatus";

export const orderStatusDescription = (status: string) => {
  const normalized = status?.toUpperCase();
  return Object.values(OrderStatus).find((s) => s === normalized);
};

export const disableReturnOrder = (status: string) => {
  return orderStatusDescription(status) === OrderStatus.SHIPPED;
};

export const enableCancelOrder = (status: string) => {
  const normalized = orderStatusDescription(status);
  return (
    normalized === OrderStatus.PENDING || normalized === OrderStatus.PROCESSING
  );
};
