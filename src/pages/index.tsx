import { ThemeProvider } from "@emotion/react";
import { initTheme } from "@/utils/theme";
import { ProductInterface } from "@/Interfaces/api/Products/ProductInterface";
import { CartsInterface } from "@/Interfaces/api/Carts/CartsInterface";
import { LayoutInterface } from "@/Interfaces/layout/LayoutInterface";
import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import dynamic from "next/dynamic";

const Layouts = dynamic(() => import("@/layouts"));
export default function Home({ productData, cartsData }: LayoutInterface) {
  return (
    <ThemeProvider theme={initTheme}>
      <Layouts productData={productData} cartsData={cartsData} />
    </ThemeProvider>
  );
}

Home.getInitialProps = async () => {
  const resProducts = await fetch(`${baseUrl}${endPoint.products}?limit=10`);
  const resCarts = await fetch(`${baseUrl}${endPoint.carts}?limit=5`);
  const products: ProductInterface = await resProducts.json();
  const carts: CartsInterface = await resCarts.json();

  return { productData: products, cartsData: carts };
};
