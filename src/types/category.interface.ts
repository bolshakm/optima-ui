import { IDish } from './dish.interface';
import { ILanguages } from './languages.interface';

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  multilingualName: ILanguages | null;
  dishes: IDish[];
}