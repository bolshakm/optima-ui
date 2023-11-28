import { IDish } from './dish.interface';
import { ILanguages, ILanguagesMap } from './languages.interface';

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  multilingualName: ILanguages | null;
  multilingualNameMap: ILanguagesMap;
  dishes: IDish[];
}