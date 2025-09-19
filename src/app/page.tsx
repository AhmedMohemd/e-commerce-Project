import { Product, ProductData } from "@/types/products.type";
import ProductsCard from "./_Component/ProductsCard/ProductsCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Browse the latest products on our Home page.",
};
export default async function Home() {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
  );
  const productsData: ProductData = await respons.json();
  const productList: Product[] = productsData.data;
  return (
    <>
      <MainSlider />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-5">
        {productList.map((product) => {
          return <ProductsCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}
