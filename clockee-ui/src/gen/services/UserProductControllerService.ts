/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageUserProductResponse } from "../models/PageUserProductResponse";
import type { UserProductResponse } from "../models/UserProductResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserProductControllerService {
  /**
   * @param page
   * @param size
   * @returns PageUserProductResponse OK
   * @throws ApiError
   */
  public static getAllProducts1(
    page?: number,
    size: number = 5,
  ): CancelablePromise<PageUserProductResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/products",
      query: {
        page: page,
        size: size,
      },
    });
  }
  /**
   * @param id
   * @returns UserProductResponse OK
   * @throws ApiError
   */
  public static getProductById1(
    id: number,
  ): CancelablePromise<UserProductResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/products/{id}",
      path: {
        id: id,
      },
    });
  }
}
