import { ICartItem } from '../store/slices/cart/cart.slice';

interface IModifiedData {
  tableNumber: number;
  orderedDishes: {
    [key: number]: number;
  };
}

export const modifyData = (items: ICartItem[], tableNumber: number) => (
  items.reduce((acc, item) => {
    acc.orderedDishes[item.dish.id] = item.quantity;
    return acc;
  }, {
    'tableNumber': tableNumber,
    'orderedDishes': {}
  } as IModifiedData)
);