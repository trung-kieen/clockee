/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonthlyRevenueDTO } from '../models/MonthlyRevenueDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminOrderControllerService {
    /**
     * @returns MonthlyRevenueDTO OK
     * @throws ApiError
     */
    public static getMonthlyRevenue(): CancelablePromise<Array<MonthlyRevenueDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/revenue/monthly',
        });
    }
    /**
     * @param year
     * @param month
     * @returns number OK
     * @throws ApiError
     */
    public static getRevenueByMonthAndYear(
        year: number,
        month: number,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/revenue/by-month-year',
            query: {
                'year': year,
                'month': month,
            },
        });
    }
}
