import { Product } from "./products";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
