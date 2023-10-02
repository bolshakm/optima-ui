import { Allergens, DishInfo } from './allergens.enum';
import { ILanguages } from './languages.interface';

export interface IDishVolumesAndPrice {
  id: number; 
  volume: string; 
  price: number;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  dishVolumesAndPrice: IDishVolumesAndPrice[];
  image?: string;
  multilingualDescription: ILanguages | null;
  multilingualName: ILanguages | null;
  allergens: Allergens[];
  infoDishIcons: DishInfo[];
}