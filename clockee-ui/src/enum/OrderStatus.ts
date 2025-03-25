export enum OrderStatus {
  PENDING = "Chưa giải quyết",
  PROCESSING = "Đang xử lý",
  SHIPPED = "Đã giao",
  RETURNING = "Đang hoàn trả",
  RETURNED = "Đã hoàn trả",
  CANCELLED = "Bị hủy",
  COMPLETED = "Hoàn tất",
}

export const orderStatusDescription = (status: string) => {
  return OrderStatus[status];
}
export const disableReturnOrder = (status: string) => {
  // Only allow return in pending status
  return !statusEqualEnum(status, OrderStatus.SHIPPED);
}
export const enableCancelOrder = (status: string) => {
  const whitelistStatus = [OrderStatus.PENDING, OrderStatus.PROCESSING];
  for (const statusEnum of whitelistStatus) {
    if (statusEqualEnum(status, statusEnum)) {
      return true;
    }
  }

  return false;
}
const statusEqualEnum = (status: string, enumValue: OrderStatus) => {
  return (orderStatusDescription(status.toUpperCase()) == (enumValue as string));
}
