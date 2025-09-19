import ProductsCard from "@/app/_Component/ProductsCard/ProductsCard";
import { ProductData, Product } from "@/types/products.type";
import Head from "next/head";
import React from "react";

export default async function ProductPage() {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
  );
  const productsData: ProductData = await respons.json();
  const productList: Product[] = productsData.data;

  return (
    <>
      <Head>
        <title>Products - Browse Our Collection</title>
        <meta
          name="description"
          content="Explore a wide variety of products across different categories. Find electronics, fashion, home essentials, and more in our store."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta property="og:title" content="Products - Browse Our Collection" />
        <meta
          property="og:description"
          content="Explore a wide variety of products across different categories. Find electronics, fashion, home essentials, and more in our store."
        />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-5">
        {productList.map((product) => {
          return <ProductsCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}
