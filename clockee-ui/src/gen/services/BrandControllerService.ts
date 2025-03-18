/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandDTO } from '../models/BrandDTO';
import type { Pageable } from '../models/Pageable';
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
            url: '/api/brands/{id}',
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
            url: '/api/brands/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param pageable
     * @returns PageBrandDTO OK
     * @throws ApiError
     */
    public static getAllBrands(
        pageable: Pageable,
    ): CancelablePromise<PageBrandDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/brands',
            query: {
                'pageable': pageable,
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
            url: '/api/brands',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
