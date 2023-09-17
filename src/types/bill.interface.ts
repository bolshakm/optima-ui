import { IDishVolumesAndPrice } from './dish.interface';

export interface IBillItem {
  id: number;
  productId: number;
  name: string;
  description: string;
  enabled: boolean;
  quantity: number;
  image: string;
  selectedVolumeId: number;
  volumeDataList: IDishVolumesAndPrice[]
}

export interface IBill {
  orderedDish: IBillItem[];
  totalSum: number;
}