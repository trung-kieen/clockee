/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-04-07 21:43:06.

export interface Brand {
    brandId: number;
    name: string;
    isDeleted: boolean;
}

export interface CartItem {
    cartItemId: number;
    product: Product;
    user: User;
    quantity: number;
}

export interface Order {
    orderId: number;
    user: User;
    createAt: Date;
    address: string;
    phone: string;
    totalPrice: number;
    status: OrderStatus;
}

export interface OrderItem {
    id: number;
    product: Product;
    order: Order;
    quantity: number;
    price: number;
}

export interface Product {
    productId: number;
    name: string;
    description: string;
    imageUrl: string;
    actualPrice: number;
    sellPrice: number;
    type: string;
    stock: number;
    brand: Brand;
    isActive: boolean;
    visible: boolean;
}

export interface Purchase {
    purchaseId: number;
    product: Product;
    supplier: Supplier;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface Role extends GrantedAuthority {
    roleId: number;
    roleName: RoleName;
    users: User[];
}

export interface Supplier {
    supplierId: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    isDeleted: boolean;
}

export interface User extends UserDetails {
    userId: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    isDeleted: boolean;
    verificationCode: VerificationCode;
    roles: Role[];
}

export interface VerificationCode {
    verificationId: number;
    emailSent: boolean;
    code: string;
    user: User;
}

export interface GrantedAuthority extends Serializable {
    authority: string;
}

export interface UserDetails extends Serializable {
    enabled: boolean;
    username: string;
    password: string;
    authorities: GrantedAuthority[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}

export interface Serializable {
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
}

export type RestResponse<R> = Promise<R>;

export const enum RoleName {
    CUSTOMER = "CUSTOMER",
    PRODUCT_ADMIN = "PRODUCT_ADMIN",
    INVENTORY_MANAGER = "INVENTORY_MANAGER",
}

export const enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    RETURNING = "RETURNING",
    RETURNED = "RETURNED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
