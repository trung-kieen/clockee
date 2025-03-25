import { OrderStatus } from "@/gen/backend";

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
