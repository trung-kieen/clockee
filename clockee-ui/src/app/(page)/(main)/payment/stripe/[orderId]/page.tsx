'use client';
import React, { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { StripeControllerService } from "@/gen";
import { logger } from "@/util/logger";
import { NEXTJS_BASE_URL, STRIPE_API_KEY } from "@/config/app-config";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { initScriptLoader } from "next/script";
import { popupRequestError } from "@/util/form";

const PaymentPage = () => {
  const params = useParams();
  const orderId = Number(params?.orderId);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_API_KEY));
    fetchClientSecret()
  }, []);
  /**
   * Get client secret for order
   */
  const fetchClientSecret = async () => {

    try {
      const response = await StripeControllerService.getPaymentSecret(orderId);
      setClientSecret(response.clientSecret);
    } catch (error) {
      logger.error(error);
      popupRequestError(error);
    }
  }
  return (
    <>
      {
        clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <CheckoutForm />
          </Elements>
        )
      }
    </>
  )
};


const CheckoutForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`, // TODO Change to redirect to order page
      },
    });


    setIsLoading(false);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Thanh toán thành công")
    }
  };

  return <>

    <div className="card  bg-base-300 shadow-sm mx-auto">
      <div className="card-body flex items-center justify-center">
        <div className="flex justify-between items-center">
          <PaymentElement />
        </div>
        <div className="mt-6">
          {
            isLoading ? (
              <button className="btn btn-primary btn-block shadow-slate-200" disabled={true} onClick={handleSubmit}>Đang thanh toán... </button>
            ) : (
              <button className="btn btn-primary btn-block text-white shadow-slate-200" disabled={!stripe} onClick={handleSubmit}>Thanh toán ngay</button>
            )
          }
        </div>
      </div>
    </div>
  </>
}
export default PaymentPage;
