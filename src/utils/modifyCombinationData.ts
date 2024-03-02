import { ICartItem, ICombinationItem } from '../store/slices/cart/cart.slice';

interface IOrderedDish {
  comment: string;
  dishId: number;
  extrasId: number[];
  qty: number;
  volumeId: number;
}

interface IOrderedCombinationItem {
  combinationId: number;
  orderedDishesForms: IOrderedDish[];
  qty: number;
}


interface IOrderedItem {
  dishId: number;
  qty: number;
  volumeId: number;
  comment: string;
  extrasId: number[];
}

export interface IModifiedData {
  data: ICombinationItem[]
}

export const modifyCombinationData = (
  items: ICombinationItem[], 
  comments: { [key:string]: string }
) => (
  items.reduce((acc, item) => {
    const orderedDishesForms = Object.values(item.orderedDishesForms).reduce(
      (forms: IOrderedItem[], items) => {
        const combinedItems = items.reduce((combinedList, { dish, extrass }) => {
          const separateDishData = {
              comment: '',
              qty: 1,
              volumeId: dish.dishVolumesAndPrice[0].id,
              dishId: dish.id,
              extrasId: extrass.reduce((ids, extra) => [...ids, extra.id], [] as unknown as number[])
          }

          return [...combinedList, separateDishData]
      }, [] as unknown as IOrderedItem[])

        return [...forms, ...combinedItems];
      },
      [] as unknown as IOrderedItem[]
    );

    const combinationItem = {
      combinationId: item.combinationId,
      qty: item.qty,
      comment: comments[item.id] || '',
      orderedDishesForms,
    }

    return [...acc, combinationItem];
  }, [] as unknown as IOrderedCombinationItem[])
);