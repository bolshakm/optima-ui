import { Allergens, DishInfo } from './allergens.enum';
import { Language } from './cafe.interface';
import { ILanguagesMap } from './languages.interface';

export interface IDishVolumesAndPrice {
  id: number; 
  volume: string; 
  price: number;
}

export interface IExtra {
  id: number; 
  name: string; 
  multilingualExtraNameMap: {
    [key in Language]: string;
  }, 
  price: number;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  dishVolumesAndPrice: IDishVolumesAndPrice[];
  image?: string;
  multilingualDescriptionMap: ILanguagesMap | null;
  multilingualNameMap: ILanguagesMap | null;
  allergens: Allergens[];
  infoDishIcons: DishInfo[];
  extras: IExtra[];
}