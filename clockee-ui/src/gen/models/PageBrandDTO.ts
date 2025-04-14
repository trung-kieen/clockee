/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandDTO } from "./BrandDTO";
import type { PageableObject } from "./PageableObject";
import type { SortObject } from "./SortObject";
export type PageBrandDTO = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: Array<BrandDTO>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
};
