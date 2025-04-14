/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageableObject } from "./PageableObject";
import type { SortObject } from "./SortObject";
import type { UserProductResponse } from "./UserProductResponse";
export type PageUserProductResponse = {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: Array<UserProductResponse>;
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
};
