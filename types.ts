
export enum Category {
  SOFAS = 'Sofas',
  CHAIRS = 'Chairs',
  BEDS = 'Beds',
  TABLES = 'Tables',
  STORAGE = 'Storage',
  KITCHEN = 'Kitchen',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[]; // Array of base64 strings
}