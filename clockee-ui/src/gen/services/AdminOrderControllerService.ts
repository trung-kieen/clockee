/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonthlyRevenueDTO } from '../models/MonthlyRevenueDTO';
import type { OrderDTO } from '../models/OrderDTO';
import type { PageResponseAdminOrderSummaryResponse } from '../models/PageResponseAdminOrderSummaryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminOrderControllerService {
    /**
     * @param status
     * @param page
     * @param size
     * @returns PageResponseAdminOrderSummaryResponse OK
     * @throws ApiError
     */
    public static getOrderSummary(
        status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'RETURNING' | 'RETURNED' | 'CANCELLED' | 'COMPLETED',
        page?: number,
        size: number = 10,
    ): CancelablePromise<PageResponseAdminOrderSummaryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/revenue',
            query: {
                'status': status,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * @param year
     * @returns OrderDTO OK
     * @throws ApiError
     */
    public static getYearlyOrder(
        year: number,
    ): CancelablePromise<OrderDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/revenue/order-by-year',
            query: {
                'year': year,
            },
        });
    }
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
     * @returns number OK
     * @throws ApiError
     */
    public static getMonthlyRevenueInYear(
        year: number,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/revenue/by-year',
            query: {
                'year': year,
            },
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
