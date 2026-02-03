import { Product } from "./products";

//Cart item extends Product with quantity field
export interface CartItem extends Product {
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}
