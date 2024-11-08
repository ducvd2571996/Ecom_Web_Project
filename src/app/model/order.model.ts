import { Product } from './cart.model';

export interface Order {
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
