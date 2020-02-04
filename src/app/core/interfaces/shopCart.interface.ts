import { ProductItem } from './productItem';

export interface ShopCartItem extends ProductItem {
  totalPrice: number;
}
