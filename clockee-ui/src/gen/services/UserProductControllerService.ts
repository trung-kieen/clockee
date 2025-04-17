/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageProductSummaryResponse } from '../models/PageProductSummaryResponse';
import type { ProductDetailsResponse } from '../models/ProductDetailsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserProductControllerService {
    /**
     * @param page
     * @param size
     * @returns PageProductSummaryResponse OK
     * @throws ApiError
     */
    public static getAllProducts1(
        page?: number,
        size: number = 10,
    ): CancelablePromise<PageProductSummaryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/products',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * @param id
     * @returns ProductDetailsResponse OK
     * @throws ApiError
     */
    public static getProductById1(
        id: number,
    ): CancelablePromise<ProductDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/products/{id}',
            path: {
                'id': id,
            },
        });
    }
}
