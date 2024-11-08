import { Product } from './cart.model';

export interface Order {
  id?: number;
  cartId?: number;
  customerId?: number;
  orderStatus: string;
  paymentMethod: string;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  totalPrice?: number;
  subTotal?: number;
  discountTotal?: number;
  products?: Product[];
  createdDate: Date;
}

export interface CreateOrder {
  cartId?: number;
  customerId?: number;
  orderStatus: string;
  paymentMethod: string;
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  totalPrice?: number;
  subTotal?: number;
  discountTotal?: number;
  products?: Product[];
}
