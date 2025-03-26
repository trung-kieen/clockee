/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandDTO } from '../models/BrandDTO';
import type { PageBrandDTO } from '../models/PageBrandDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BrandControllerService {
    /**
     * @param id
     * @param requestBody
     * @returns BrandDTO OK
     * @throws ApiError
     */
    public static updateBrand(
        id: number,
        requestBody: BrandDTO,
    ): CancelablePromise<BrandDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/brands/{id}',
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
    public static deleteBrand(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/brands/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param page
     * @param size
     * @returns PageBrandDTO OK
     * @throws ApiError
     */
    public static getAllBrands(
        page?: number,
        size: number = 5,
    ): CancelablePromise<PageBrandDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/brands',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * @param requestBody
     * @returns BrandDTO OK
     * @throws ApiError
     */
    public static addBrand(
        requestBody: BrandDTO,
    ): CancelablePromise<BrandDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/brands',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
