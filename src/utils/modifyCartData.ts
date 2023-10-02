import { ICartItem } from '../store/slices/cart/cart.slice';

interface IOrderedDish {
  dishId: number;
  qty: number;
  volumeId: number;
  comment: string;
}

export interface IModifiedData {
  tableNumber: string;
  cafeId: string;
  orderedDishesForms: IOrderedDish[];
}

export const modifyData = (
  items: ICartItem[], 
  cafeId: string, 
  tableNumber: string, 
  comments: { [key:string]: string }
) => (
  items.reduce((acc, item) => {
    acc.orderedDishesForms = [...acc.orderedDishesForms, { dishId: item.dish.id, qty: item.quantity, volumeId: item.volumeId, comment: comments[`${item.dish.id}-${item.volumeId}`] }]
    return acc;
  }, {
    tableNumber,
    cafeId,
    'orderedDishesForms': []
  } as unknown as IModifiedData)
);