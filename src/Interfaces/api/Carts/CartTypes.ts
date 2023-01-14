import { ProductType } from "../Products/ProductType";

export type CartsType = {
  id: string;
  products: ProductType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};
