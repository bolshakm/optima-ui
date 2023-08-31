export interface IDishVolumesAndPrice {
  id: number; 
  volume: string; 
  price: number;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  dishVolumesAndPrice: IDishVolumesAndPrice[];
  image?: string;
}