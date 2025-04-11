// Avoid use gernerate enum due to eslint compile const enum
export const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  RETURNING: "RETURNING",
  RETURNED: "RETURNED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
} as const;
