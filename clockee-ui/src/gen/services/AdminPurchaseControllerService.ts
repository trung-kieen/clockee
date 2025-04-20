/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Purchase } from "../models/Purchase";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AdminPurchaseControllerService {
  /**
   * @param productId
   * @param supplierId
   * @param quantity
   * @param price
   * @returns Purchase OK
   * @throws ApiError
   */
  public static addPurchase(
    productId: number,
    supplierId: number,
    quantity: number,
    price: number,
  ): CancelablePromise<Purchase> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/purchase/add",
      query: {
        productId: productId,
        supplierId: supplierId,
        quantity: quantity,
        price: price,
      },
    });
  }
  /**
   * @returns Purchase OK
   * @throws ApiError
   */
  public static getPurchaseHistory(): CancelablePromise<Array<Purchase>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/purchase/history",
    });
  }
}
