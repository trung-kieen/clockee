/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from './PageableObject';
import type { SortObject } from './SortObject';
import type { SupplierDTO } from './SupplierDTO';
export type PageSupplierDTO = {
    totalPages?: number;
    totalElements?: number;
    pageable?: PageableObject;
    size?: number;
    content?: Array<SupplierDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
};

