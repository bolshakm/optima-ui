import { ICartItem } from '../store/slices/cart/cart.slice';

export interface IBill {
  orderedDish: ICartItem[];
  totalSum: number;
}