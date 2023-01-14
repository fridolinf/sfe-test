import { CartsType } from "./CartTypes";

export interface CartsInterface {
  carts: CartsType[];
  limit: number;
  skip: number;
  total: number;
}
