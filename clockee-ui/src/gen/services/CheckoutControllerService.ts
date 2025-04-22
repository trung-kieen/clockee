/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderRequest } from "../models/CreateOrderRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CheckoutControllerService {
  /**
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static createOrder(
    requestBody: CreateOrderRequest,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/checkout",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
