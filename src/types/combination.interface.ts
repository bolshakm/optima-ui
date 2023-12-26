import { IDish } from './dish.interface'
import { ILanguagesMap } from './languages.interface';

export interface ICombinationDish {
  active: boolean;
  allowedQty: number;
  id: number;
  multilingualDescriptionMap: ILanguagesMap | null;
  multilingualNameMap: ILanguagesMap | null;
  description: string;
  name: string;
  dishes: IDish[];
}

export interface ICombination {
  id: number;
  name: string;
  description: string;
  multilingualNameMap: ILanguagesMap | null;
  multilingualDescriptionMap: ILanguagesMap | null;
  availableTime: string | null;
  price: number;
  combinationDishes: ICombinationDish[]
  active: boolean;
}
