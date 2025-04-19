/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminProductResponse } from './AdminProductResponse';
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
export type PageAdminProductResponse = {
    totalElements?: number;
    totalPages?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    size?: number;
    content?: Array<AdminProductResponse>;
    number?: number;
    sort?: SortObject;
    numberOfElements?: number;
    empty?: boolean;
};

