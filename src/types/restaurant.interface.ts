import { ICombination } from './combination.interface';
import { ICategory } from './category.interface';

export interface IRestaurant {
  id: number;
  name: string;
  tableNumber: number;
  categories: ICategory[];
  combinations: ICombination[] | null;
  active: boolean;
}