"use client"
import { disableReturnOrder, enableCancelOrder, orderStatusDescription } from "@/utils/enum/order-utils";
import { OrderSummary } from "@/models/common/Order";
import { ProductItemSummary } from "@/models/common/Order";
import React, { useState } from "react";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { OrderStatus } from "@/gen/backend";
import ConfirmModal from "@/app/components/modal/ConfirmModal";




const mockOrders: OrderSummary[] = [
  {
    orderId: 1001,
    totalPrice: 120.5,
    status: "PENDING",
    items: [
      {
        productId: 1,
        name: "Casio Nam AE-1200WHD-1AVDF",
        image_url: "https://www.watchstore.vn/images/products/2024/resized/op990-45adgs-gl-t-1-1131812509-1619214585-1712491626.webp"
      },
      {
        productId: 2,
        name: "Casio MTP Nam MTP-1374L-1AVDF",
        image_url: "https://www.watchstore.vn/images/products/2024/resized/ra-aa0b05r19b-1-1656995523580-1712492091.webp"
      }
    ],
    address: "123 Main St, Cityville, CA 90210"
  },
  {
    orderId: 1002,
    totalPrice: 75.0,
    status: "SHIPPED",
    items: [
      {
        productId: 3,
        name: "Orient SK Nam RA-AA0B02R39B",
        image_url: "https://www.watchstore.vn/images/products/2024/resized/1-khung-sp-1929946388-952124312-1712483020.webp"
      }
    ],
    address: "456 Oak Dr, Townsville, NY 10001"
  },
  {
    orderId: 1003,
    totalPrice: 200.75,
    status: "SHIPPED",
    items: [
      {
        productId: 4,
        name: "Olym Pianus Nam OP990-45ADGS-GL-D",
        image_url: "https://www.watchstore.vn/images/products/others/2024/large/op990-45adgs-gl-d-1-1655171724651-1712585288.webp"
      },
      {
        productId: 5,
        name: "Đồng hồ Cơ Orient Nam",
        image_url: "https://www.watchstore.vn/images/products/2024/resized/ra-ar0004s10b-1756195028-1760240517-1712485752.webp"
      }
    ],
    address: "789 Pine Rd, Villageton, TX 73301"
  },
  {
    orderId: 1004,
    totalPrice: 500.75,
    status: "COMPLETED",
    items: [
      {
        productId: 4,
        name: "Olym Pianus Nam OP990-45ADGS-GL-D",
        image_url: "https://www.watchstore.vn/images/products/others/2024/large/op990-45adgs-gl-d-1-1655171724651-1712585288.webp"
      },
      {
        productId: 3,
        name: "Orient SK Nam RA-AA0B02R39B",
        image_url: "https://www.watchstore.vn/images/products/2024/resized/1-khung-sp-1929946388-952124312-1712483020.webp"
      }
    ],
    address: "789 Rose Rd, MCat, TX 73301"
  }
];
const OrderStatusPage = () => {
  return (
    <>
      <div className="container mx-auto p-10">

        <div className="tabs tabs-lift tabs-xl">
          <input type="radio" name="my_tabs_3" className="tab" aria-label="Tất cả" defaultChecked />
          <OrderTab orders={mockOrders} />

          {
            // Filter for each order status
            Object.values(OrderStatus).map((status) => (
              <OrderByStatus key={status} status={status} />
            ))
          }

        </div>

      </div>

    </>
  );
};



/**
 * Filter tab for order by status: PENDING, SHIPPED, etc
 *
 */
const OrderByStatus: React.FC<{ status: string }> = ({ status }) => {

  // TODO: fetch order by status with API instead
  const statusValue = orderStatusDescription(status)
  const mockByStatus = mockOrders.filter((order: OrderSummary) => order.status == status);
  return (
    <>
      <input type="radio" name="my_tabs_3" className="tab" aria-label={statusValue} />
      <OrderTab orders={mockByStatus} />
    </>
  )

}
const OrderTab: React.FC<{ orders: OrderSummary[] }> = ({ orders }) => {
  return (
    <>
      <div className="tab-content bg-base-100 border-base-300 p-6">{
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>{/* View detail */}</th>
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
              {
                orders.map((order: OrderSummary) => (
                  <OrderRow key={order.orderId} order={order} />
                ))
              }
            </tbody>
            {/* foot */}
          </table>
        </div>

      }</div>
    </>
  )

}
const ProductItem: React.FC<{ product: ProductItemSummary }> = ({ product }) => {

  return (
    <>
      <div className="flex items-center">

        <div className="avatar">
          {/* Thumbnail */}
          <div className="mask mask-squircle h-12 w-12">
            <img
              src={product.image_url}
              alt="" />
          </div>
        </div>
        <div>
          <div>{product.name}</div>
        </div>

      </div>
    </>
  )

}
const OrderRow: React.FC<{ order: OrderSummary }> = ({ order }) => {
  const [isOpen, setOpen] = useState(false);


  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);


  // const openModal = () => modalRef.current.showModal();
  // const closeModal = () => modalRef.current.close();

  const handleConfirm = () => {
    console.log("Action Confirmed!");
    closeModal();
  };

  return (

    <>
      <tr>
        <td><i className="fa fa-external-link-alt  cursor-pointer"></i></td>
        <td>
          <div className="flex items-start flex-col gap-3  text-wrap max-w-96">

            {
              order.items.map((item, idx) => (
                <ProductItem key={idx} product={item} />
              ))
            }
          </div>
        </td>
        <td>
          <br />
          <span className="badge badge-xl badge-ghost">{orderStatusDescription(order.status)}</span>
        </td>
        <td className="max-w-64">{order.address}</td>
        <td>{order.totalPrice}</td>
        <td>
          <button className={`btn  btn-sm ${disableReturnOrder(order.status) ? "btn-disabled" : ""}`}>Trả hàng</button>
        </td>
        <td>
          {
            enableCancelOrder(order.status) &&
            <button onClick={openModal} className={`btn  btn-sm`}>Hủy đơn</button>
          }


          {/* Confirm message for cancel order action */}
          <div>



            <ConfirmModal
              isOpen={isOpen}
              onClose={closeModal}
              onConfirm={handleConfirm}
              title={"Xác nhận"}
              content={"Bạn có muốn hủy đơn hàng này?"}
            />

          </div>
        </td>

      </tr>
    </>
  )
}

export default OrderStatusPage;
