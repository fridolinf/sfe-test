import { CartsInterface } from "../api/Carts/CartsInterface";
import { ProductInterface } from "../api/Products/ProductInterface";

export interface LayoutInterface {
  productData: ProductInterface;
  cartsData: CartsInterface;
}
