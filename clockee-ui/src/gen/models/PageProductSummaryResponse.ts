/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from "./PageableObject";
import type { ProductSummaryResponse } from "./ProductSummaryResponse";
import type { SortObject } from "./SortObject";
export type PageProductSummaryResponse = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: Array<ProductSummaryResponse>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
};
