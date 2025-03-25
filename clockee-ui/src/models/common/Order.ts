export interface OrderSummary {
  orderId: number;
  totalPrice: number;
  status: string;
  items: Array<ProductItemSummary>;
  address: string;
}
export interface ProductItemSummary {
  productId: number;
  name: string;
  image_url: string; // thumnail
}
