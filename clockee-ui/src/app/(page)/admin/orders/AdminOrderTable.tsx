import { toast } from "react-toastify";
import { format } from "date-fns";
import { formatVND } from "@/utils/currency";
import Link from "next/link";
import { OrderStatus as OrderStatusType } from "@/gen/backend";
import { canApprove, canCancel, canCompleteShipping, canStartShipping, getOrderStatusLabel } from "@/utils/order-utils";
import { AdminOrderSummaryResponse } from "@/gen";

const AdminOrderTable = ({ orders }: { orders: AdminOrderSummaryResponse[] }) => {
  const handleApprove = (orderId: number) => {
    toast.success(`Đơn hàng ${orderId} đã được duyệt.`);
    // Gọi API cập nhật trạng thái đơn hàng ở đây
  };

  const handleStartShipping = (orderId: number) => {
    toast.success(`Đơn hàng ${orderId} đã bắt đầu vận chuyển.`);
    // Gọi API chuyển trạng thái PROCESSING → SHIPPED
  };

  const handleCompleteShipping = (orderId: number) => {
    toast.success(`Đơn hàng ${orderId} đã được giao thành công.`);
    // Gọi API chuyển trạng thái SHIPPED → DELIVERED
  };

  const handleCancel = (orderId: number) => {
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
              <td>{order.phone}</td>
              <td className="max-w-[250px] truncate">{order.address}</td>
              <td>{order.createdAt ? format(new Date(order.createdAt), "dd/MM/yyyy") : ''}</td>
              <td>{formatVND(order.totalPrice)}</td>
              <td>
                <span className="badge badge-md font-medium  badge-soft badge-neutral">
                  {getOrderStatusLabel(order.status as OrderStatusType)}
                </span>
              </td>
              <td className="flex gap-2">
                <Link href={`/orders/${order.orderId}`}>
                  <button className="btn btn-sm btn-outline">Chi tiết</button>
                </Link>
              </td>
              <td className="flex gap-1">

                {canApprove(order.status) && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(Number(order.orderId))}
                  >
                    Duyệt đơn
                  </button>
                )}
                {canStartShipping(order.status) && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleStartShipping(Number(order.orderId))}
                  >
                    Bắt đầu vận chuyển
                  </button>
                )}
                {canCompleteShipping(order.status) && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleCompleteShipping(Number(order.orderId))}
                  >
                    Giao thành công
                  </button>
                )}
                {canCancel(order.status) && (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleCancel(Number(order.orderId))}
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
export default AdminOrderTable;
