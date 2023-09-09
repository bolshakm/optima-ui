import { IBill } from '../types';
import { IModifiedData } from './modifyCartData';

export function combineArrays(main: IModifiedData, another: IBill) {
  const mainMap = new Map(main.orderedDishesForms.map(item => [`${item.dishId}_${item.volumeId}`, item]));

  for (const item of another.orderedDish) {
    const key = `${item.id}_${item.selectedVolumeId}`;
    const existingItem = mainMap.get(key) || { dishId: item.id, qty: 0, volumeId: item.selectedVolumeId };

    existingItem.qty += item.quantity;

    mainMap.set(key, existingItem);
  }

  main.orderedDishesForms = Array.from(mainMap.values());

  return main;
}
