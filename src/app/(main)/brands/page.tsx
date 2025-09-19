import BrandsCard from "@/app/_Component/BrandsCard/BrandsCard";
import { Brandes, BrandesData } from "@/types/BrandesData";
import Head from "next/head";
import React from "react";
export default async function Brand() {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`
  );
  const CategoryData: BrandesData = await respons.json();
  const CategoryList: Brandes[] = CategoryData.data;
  return (
    <div>
      <>
        <Head>
          <title>Brands - Explore Top Brands</title>
          <meta
            name="description"
            content="Browse and explore a wide selection of top brands available in our store. Find your favorite brand and shop their latest products."
          />
          <meta name="author" content="Ahmed Moahmed" />
          <meta property="og:title" content="Brands - Explore Top Brands" />
          <meta
            property="og:description"
            content="Browse and explore a wide selection of top brands available in our store. Find your favorite brand and shop their latest products."
          />
        </Head>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 text-center">
          {CategoryList.map((brandsItem) => {
            return <BrandsCard key={brandsItem._id} brands={brandsItem} />;
          })}
        </div>
      </>
    </div>
  );
}
