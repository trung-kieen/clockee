/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FinancialReportDTO } from '../models/FinancialReportDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FinancialReportControllerService {
    /**
     * @param year
     * @param month
     * @returns FinancialReportDTO OK
     * @throws ApiError
     */
    public static geFinancialReport(
        year: number,
        month: number,
    ): CancelablePromise<FinancialReportDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/financial-report/by-year-month',
            query: {
                'year': year,
                'month': month,
            },
        });
    }
}
