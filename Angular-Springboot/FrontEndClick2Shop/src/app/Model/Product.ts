export interface Product {
    id?: number| null; // facultatif pour la création
    title: string;
    price: number;
    availability: string;
    category: string;
  }