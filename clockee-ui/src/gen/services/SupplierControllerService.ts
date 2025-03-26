/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageSupplierDTO } from '../models/PageSupplierDTO';
import type { SupplierDTO } from '../models/SupplierDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupplierControllerService {
    /**
     * @param id
     * @param requestBody
     * @returns SupplierDTO OK
     * @throws ApiError
     */
    public static updateSupplier(
        id: number,
        requestBody: SupplierDTO,
    ): CancelablePromise<SupplierDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/suppliers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteSupplier(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/suppliers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param page
     * @param size
     * @returns PageSupplierDTO OK
     * @throws ApiError
     */
    public static getAllSuppliers(
        page?: number,
        size: number = 5,
    ): CancelablePromise<PageSupplierDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/suppliers',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * @param requestBody
     * @returns SupplierDTO OK
     * @throws ApiError
     */
    public static addSupplier(
        requestBody: SupplierDTO,
    ): CancelablePromise<SupplierDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/suppliers',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
