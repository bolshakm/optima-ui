import { IDishVolumesAndPrice } from './dish.interface';
import { ILanguages } from './languages.interface';

export interface IBillItem {
  id: number;
  productId: number;
  name: string;
  description: string;
  multilingualDescription: ILanguages | null;
  multilingualName: ILanguages | null;
  enabled: boolean;
  quantity: number;
  image: string;
  selectedVolumeId: number;
  volumeDataList: IDishVolumesAndPrice[];
}

export interface IBill {
  orderedDish: IBillItem[];
  totalSum: number;
}