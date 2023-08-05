import { ICategory } from './category.interface';

export interface IRestaurant {
  id: number;
  name: string;
  tableNumber: number;
  categories: ICategory[];
  active: boolean;
}