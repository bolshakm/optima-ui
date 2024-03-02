import { IDish } from './dish.interface'
import { ILanguagesLow, ILanguagesMap } from './languages.interface';

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
  multilingualName: ILanguagesLow | null;
  multilingualDescription: ILanguagesLow | null;
  availableTime: string | null;
  price: number;
  combinationDishes: ICombinationDish[]
  active: boolean;
  enabled: boolean;
}
