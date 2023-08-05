import { IDish } from './dish.interface';

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  dishes: IDish[];
}