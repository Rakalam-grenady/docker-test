export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  quantity: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  quantity?: number;
}

