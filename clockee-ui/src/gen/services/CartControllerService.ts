/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartDetailsResponse } from "../models/CartDetailsResponse";
import type { CartItemDTO } from "../models/CartItemDTO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CartControllerService {
  /**
   * @param item
   * @returns any OK
   * @throws ApiError
   */
  public static addItem(
    item: CartItemDTO,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/cart/items",
      query: {
        item: item,
      },
    });
  }
  /**
   * @param item
   * @returns any OK
   * @throws ApiError
   */
  public static updateItem(
    item: CartItemDTO,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/user/cart/items",
      query: {
        item: item,
      },
    });
  }
  /**
   * @returns CartDetailsResponse OK
   * @throws ApiError
   */
  public static getAllItems(): CancelablePromise<CartDetailsResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/cart",
    });
  }
  /**
   * @param productId
   * @returns any OK
   * @throws ApiError
   */
  public static removeItem(
    productId: number,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/user/cart/items/{productId}",
      path: {
        productId: productId,
      },
    });
  }
}
