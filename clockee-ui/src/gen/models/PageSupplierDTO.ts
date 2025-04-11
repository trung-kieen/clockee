/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from "./PageableObject";
import type { SortObject } from "./SortObject";
import type { SupplierDTO } from "./SupplierDTO";
export type PageSupplierDTO = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: Array<SupplierDTO>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
};
