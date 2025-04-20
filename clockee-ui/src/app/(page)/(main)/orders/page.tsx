"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { OrderControllerService, OrderSummaryResponse } from "@/gen";
import Thumbnail from "@/app/components/common/Thumbnail";
import { ProductImage } from "@/app/components/common/Base64Image";
import { OrderStatus as OrderStatusType } from "@/gen/backend";
import { OrderStatus } from "@/models/enum/OrderStatus";
import { logger } from "@/utils/logger";
import {
  disableReturnOrder,
  enableCancelOrder,
  getOrderStatusLabel,
} from "@/utils/order-utils";
import { formatVND } from "@/utils/currency";
import Link from "next/link";
import { toast } from "react-toastify";

const OrderStatusPage = () => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatusType>();
  const [orders, setOrders] = useState<OrderSummaryResponse[]>([]);
  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(event.target.value as OrderStatusType);
  };

  const fetchOrderByStatus = async (status: OrderStatusType | undefined) => {
    try {
      const userOrders = await OrderControllerService.getAllOrders(status);
      setOrders(userOrders);
    } catch (error) {
      logger.warn(error);
    }
  };
  useEffect(() => {
    fetchOrderByStatus(currentStatus);
  }, [currentStatus]);
  return (
    <>
      <div className="container mx-auto p-10">
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
          <OrderTab orders={orders} />

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
    </>
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
  orders: OrderSummaryResponse[];
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
      <OrderTab key={status} orders={orders} />
    </>
  );
};

/**
 * Filter tab for order by status: PENDING, SHIPPED, etc
 *
 */
const OrderTab: React.FC<{ orders: OrderSummaryResponse[] }> = ({ orders }) => {
  return (
    <>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        {
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>{/* View detail */}</th>
                  <th>Mã đơn</th>
                  <th>Mặt hàng</th>
                  <th>Trạng thái vận chuyển</th>
                  <th>Địa chỉ giao hàng</th>
                  <th>Tổng giá</th>
                  <th>{/* Return order button */}</th>
                  <th>{/* Cancel order button */}</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {orders.map((order) => (
                  <OrderRow key={order.orderId} order={order} />
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        }
      </div>
    </>
  );
};
const OrderRow = ({ order }: { order: OrderSummaryResponse }) => {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const handleConfirmCancelOrder = async () => {
    try {
      if (!order.orderId) {
        logger.error("Unknow order id");
        return;
      }
      await OrderControllerService.cancelOrder(order.orderId);
      toast.success("Đơn hàng đã được hủy");
    } catch (error) {
      logger.error(String(error));
    }
    closeModal();
  };

  return (
    <>
      <tr>
        <td>
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </td>
        <td>{order.orderId}</td>
        <td>
          <div className="flex items-start flex-col gap-3  text-wrap max-w-96">
            {order.orderItems?.map((item) => (
              <div key={item.productId} className="flex items-start gap-4">
                <Thumbnail className="size-[6rem]">
                  <ProductImage data={item.image} />
                </Thumbnail>
                <div className="flex-1">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="text-bold font-medium mb-2">{item.name}</h3>
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm">Số lượng:</span>
                    <div className="flex items-center">
                      <span className="px-2">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm">Giá:</span>
                    <div className="flex items-center">
                      <div className="text-sm">{formatVND(item.price)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </td>
        <td>
          <br />
          <span className="badge badge-md font-medium  badge-soft badge-neutral">
            {getOrderStatusLabel(order.status as OrderStatusType)}
          </span>
        </td>

        <td className="max-w-64">{order.address}</td>
        <td>{formatVND(order.totalPrice)}</td>
        <td>
          {/*
          <button
            className={`btn  btn-sm ${disableReturnOrder(order.status as OrderStatusType) ? "hidden" : ""}`}
          >
            Trả hàng
          </button>
            *
            */}
        </td>
        <td>
          {enableCancelOrder(order.status as OrderStatusType) && (
            <button onClick={openModal} className={`btn  btn-sm btn-error`}>
              Hủy đơn
            </button>
          )}

          {/* Confirm message for cancel order action */}
          <div>
            <ConfirmModal
              isOpen={isOpen}
              onClose={closeModal}
              onConfirm={handleConfirmCancelOrder}
              title={"Xác nhận"}
              content={"Bạn có muốn hủy đơn hàng này?"}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrderStatusPage;
