import { Language } from './cafe.interface';

export interface ILanguages {
  en: string;
  es: string;
}

export type ILanguagesMap = {
  [key in Language]?: string;
};