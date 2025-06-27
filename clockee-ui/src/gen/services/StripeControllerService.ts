/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentResponse } from "../models/PaymentResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class StripeControllerService {
  /**
   * @param orderId
   * @returns PaymentResponse OK
   * @throws ApiError
   */
  public static getPaymentSecret(
    orderId: number,
  ): CancelablePromise<PaymentResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/payment/stripe/{orderId}",
      path: {
        orderId: orderId,
      },
    });
  }
}
