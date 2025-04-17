/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from './Product';
import type { Supplier } from './Supplier';
export type Purchase = {
    purchaseId?: number;
    product?: Product;
    supplier?: Supplier;
    price?: number;
    quantity?: number;
    totalPrice?: number;
    createAt?: string;
};

