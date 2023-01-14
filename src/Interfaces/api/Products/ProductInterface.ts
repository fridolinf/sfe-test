import { ProductType } from "./ProductType";

export interface ProductInterface {
  products: ProductType[];
  limit: number;
  skip: number;
  total: number;
}
