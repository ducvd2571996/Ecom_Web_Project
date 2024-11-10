export interface Coupon {
  code: string;
  value: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  tax: number;
  discount: number;
  price: number;
  quantity: number;
  note: string;
}

export interface CreateCartDTO {
  products: Product[];
  tax?: number;
  customerId: number;
  totalPrice?: number;
  subTotal?: number;
  discountTotal?: number;
  coupon?: Coupon;
  note?: string;
  isAddToCart?: boolean;
}

export interface RemoveCartItem {
  productId: number;
  customerId: number;
}

export interface Cart {
  id: number;
  customerId: number;
  products: Product[];
  tax?: number;
  totalPrice?: number;
  subTotal?: number;
  discountTotal?: number;
  coupon?: Coupon;
  note?: string;
}
