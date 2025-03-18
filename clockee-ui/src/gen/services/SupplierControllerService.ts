/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pageable } from '../models/Pageable';
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
            url: '/api/suppliers/{id}',
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
            url: '/api/suppliers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param pageable
     * @returns PageSupplierDTO OK
     * @throws ApiError
     */
    public static getAllSuppliers(
        pageable: Pageable,
    ): CancelablePromise<PageSupplierDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/suppliers',
            query: {
                'pageable': pageable,
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
            url: '/api/suppliers',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
