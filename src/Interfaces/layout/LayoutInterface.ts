import { CartsType } from "../api/Carts/CartTypes";
import { ProductType } from "../api/Products/ProductType";

export interface LayoutInterface {
  productData: ProductType[];
  cartsData: CartsType[];
}
