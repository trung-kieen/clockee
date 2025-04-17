/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from './PageableObject';
import type { ProductSummaryResponse } from './ProductSummaryResponse';
import type { SortObject } from './SortObject';
export type PageProductSummaryResponse = {
    totalPages?: number;
    totalElements?: number;
    pageable?: PageableObject;
    size?: number;
    content?: Array<ProductSummaryResponse>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
};

