import { ICartItem } from '../store/slices/cart/cart.slice';

interface IOrderedDish {
  dishId: number;
  qty: number;
  volumeId: number;
  comment: string;
  extrasId: number[];
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
    const extrasId = item.extras.map((extra) => extra.id);

    acc.orderedDishesForms = [
      ...acc.orderedDishesForms, 
      { 
        dishId: item.dish.id, 
        qty: item.quantity, 
        volumeId: item.volumeId, 
        comment: comments[`${item.dish.id}-${item.volumeId}`] ,
        extrasId,
      }
    ]
    return acc;
  }, {
    tableNumber,
    cafeId,
    'orderedDishesForms': []
  } as unknown as IModifiedData)
);