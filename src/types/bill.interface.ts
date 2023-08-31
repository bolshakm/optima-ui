import { IDishVolumesAndPrice } from './dish.interface';

export interface IBillItem {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  quantity: number;
  selectedVolumeId: number;
  volumeDataList: IDishVolumesAndPrice[]
}

export interface IBill {
  orderedDish: IBillItem[];
  totalSum: number;
}