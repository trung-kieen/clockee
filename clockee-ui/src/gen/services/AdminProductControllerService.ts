/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageResponseAdminProductDTO } from '../models/PageResponseAdminProductDTO';
import type { ProductDTO } from '../models/ProductDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminProductControllerService {
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getDetails(
        id: number,
    ): CancelablePromise<Record<string, any>> {
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
     * @param dto
     * @returns any OK
     * @throws ApiError
     */
    public static update(
        id: number,
        dto: ProductDTO,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/products/{id}',
            path: {
                'id': id,
            },
            query: {
                'dto': dto,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static delete(
        id: number,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns PageResponseAdminProductDTO OK
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<PageResponseAdminProductDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/products/',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static create(
        requestBody: ProductDTO,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/products/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
