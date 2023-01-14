import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import { CartsInterface } from "@/Interfaces/api/Carts/CartsInterface";
import { ProductInterface } from "@/Interfaces/api/Products/ProductInterface";
import { LayoutInterface } from "@/Interfaces/layout/LayoutInterface";
import { initTheme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import dynamic from "next/dynamic";

const Layouts = dynamic(() => import("@/components/layouts"));

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
