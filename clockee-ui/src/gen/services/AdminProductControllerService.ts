/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminProductRequest } from '../models/AdminProductRequest';
import type { AdminProductResponse } from '../models/AdminProductResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminProductControllerService {
    /**
     * @param id
     * @returns AdminProductResponse OK
     * @throws ApiError
     */
    public static getProductById(
        id: number,
    ): CancelablePromise<AdminProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns AdminProductResponse OK
     * @throws ApiError
     */
    public static updateProduct(
        id: number,
        requestBody: AdminProductRequest,
    ): CancelablePromise<AdminProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns AdminProductResponse OK
     * @throws ApiError
     */
    public static deleteProduct(
        id: number,
    ): CancelablePromise<AdminProductResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param page
     * @param size
     * @returns AdminProductResponse OK
     * @throws ApiError
     */
    public static getAllProduct(
        page?: number,
        size: number = 5,
    ): CancelablePromise<Array<AdminProductResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/products',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AdminProductResponse OK
     * @throws ApiError
     */
    public static createProduct(
        requestBody: AdminProductRequest,
    ): CancelablePromise<AdminProductResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
