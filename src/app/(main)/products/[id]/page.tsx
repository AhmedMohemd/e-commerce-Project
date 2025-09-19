import ProductsDetailsCrad from "@/app/_Component/productsDetailsCrad/page";
import {
  ProductDetails,
  ProductDetailsData,
} from "@/types/productsDetails.type";
import Head from "next/head";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
  );
  const Data: ProductDetails = await response.json();
  const product: ProductDetailsData = Data.data;

  return (
    <div>
      <Head>
        <title>{product.title} - Product Details</title>
        <meta
          name="description"
          content={`View detailed information about ${product.title}. Check specifications, features, and more before making your purchase.`}
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta
          property="og:title"
          content={`${product.title} - Product Details`}
        />
        <meta
          property="og:description"
          content={`View detailed information about ${product.title}. Check specifications, features, and more before making your purchase.`}
        />
      </Head>
      <ProductsDetailsCrad product={product} />
    </div>
  );
}
