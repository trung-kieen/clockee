/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductControllerService {
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getDetails1(
        id: number,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/products/{id}',
            path: {
                'id': id,
            },
        });
    }
}
