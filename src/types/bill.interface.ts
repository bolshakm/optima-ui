import { Allergens, DishInfo } from './allergens.enum';
import { IDishVolumesAndPrice } from './dish.interface';
import { ILanguagesMap } from './languages.interface';

export interface IBillItem {
  id: number;
  comment: string;
  productId: number;
  name: string;
  description: string;
  multilingualDescriptionMap: ILanguagesMap | null;
  multilingualNameMap: ILanguagesMap | null;
  enabled: boolean;
  quantity: number;
  image: string;
  selectedVolumeId: number;
  allergens: Allergens[];
  infoDishIcons: DishInfo[];
  volumeDataList: IDishVolumesAndPrice[];
}

export interface IBill {
  orderedDish: IBillItem[];
  totalSum: number;
}