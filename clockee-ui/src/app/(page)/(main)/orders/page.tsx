"use client";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { OrderControllerService, OrderSummaryResponse, StripeControllerService } from "@/gen";
import { OrderStatus as OrderStatusType } from "@/gen/backend";
import { OrderStatusDict } from "@/model/OrderStatus";
import { logger } from "@/util/logger";
import { getOrderStatusLabel } from "@/util/order-utils";
import OrderTab from "./components/order-tabs";
import { ProtectedRoute } from "@/app/components/route/protected";
import { useRouter, useSearchParams } from "next/navigation";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const OrderHistoryPage = () => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatusType>();
  const [orders, setOrders] = useState<OrderSummaryResponse[]>([]);

  // const router = useRouter();

  // const stripe = useStripe();

  // const searchParams = useSearchParams();
  useEffect(() => {

    const fetchPaymentStatus = async () => {
      // const clientSecret = new URLSearchParams(window.location.search).get(
      //   'payment_intent_client_secret'
      // );

      // const clientSecret = searchParams.get("payment_intent_client_secret");


      // const intentDetails = await stripe.retrievePaymentIntent(clientSecret);
      // switch (intentDetails.paymentIntent?.status) {

      //   case 'succeeded':
      //     toast.success('Success! Payment received.');
      //     break;

      //   case 'processing':
      //     toast.info("Payment processing. We'll update you when payment is received.");
      //     break;

      //   case 'requires_payment_method':
      //     // Redirect your user back to your payment page to attempt collecting
      //     // payment again

      //     toast.error('Payment failed. Please try another payment method.');
      //     router.back();
      //     break;

      //   default:
      //     toast.error('Something went wrong.');
      //     break;
      // }


    }

    fetchPaymentStatus();

  }, []);



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
  const handleOrdersChange = (updatedOrders: OrderSummaryResponse[]) => {
    setOrders(updatedOrders);
  };
  useEffect(() => {
    fetchOrderByStatus(currentStatus);
  }, [currentStatus]);
  return (
    <>
      <ProtectedRoute>
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
              <OrderTab orders={orders} onOrdersChange={handleOrdersChange} />

              {
                // Filter for each order status
                Object.entries(OrderStatusDict).map(([status, value]) => (
                  <Fragment key={status}>
                    <input
                      type="radio"
                      name="status"
                      className="tab"
                      value={value}
                      aria-label={getOrderStatusLabel(status as OrderStatusType)}
                      onChange={handleStatusChange}
                    />
                    <OrderTab
                      key={status}
                      orders={orders}
                      onOrdersChange={handleOrdersChange}
                    />
                  </Fragment>
                ))
              }
            </div>
          </div>
      </ProtectedRoute>
    </>
  );
};

export default OrderHistoryPage;
