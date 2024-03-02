import { Allergens, DishInfo } from './allergens.enum';
import { IDishVolumesAndPrice, IExtra } from './dish.interface';
import { ILanguagesMap } from './languages.interface';

export interface IBillItem {
  id: number;
  comment: string;
  productId: number;
  name: string;
  description: string;
  multilingualDescriptionMap: ILanguagesMap | null;
  multilingualNameMap: ILanguagesMap | null;
  extras: IExtra[];
  enabled: boolean;
  quantity: number;
  image: string;
  imageUrl: string;
  selectedVolumeId: number;
  allergens: Allergens[];
  infoDishIcons: DishInfo[];
  volumeDataList: IDishVolumesAndPrice[];
}

interface IOrderedCombinationDishData {
  multilingualNameMap: ILanguagesMap;
}

export interface IBillCombination {
  name: string;
  orderedCombinationDishData: IOrderedCombinationDishData[];
  qty: number;
  price: number;
}

export interface IBill {
  orderedCombinationData: IBillCombination[];
  orderedDish: IBillItem[];
  totalSum: number;
}