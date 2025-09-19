import CategoryCard from "@/app/_Component/CategoryCard/CategoryCard";
import { CategoryData, CategoryItem } from "@/types/CategoryData";
import Head from "next/head";
import React from "react";
export default async function Category() {
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
  );
  const CategoryData: CategoryData = await respons.json();
  const CategoryList: CategoryItem[] = CategoryData.data;
  return (
    <div>
      
      <>
          <Head>
      <title>Categories - Browse All Product Categories</title>
      <meta
        name="description"
        content="Discover and browse all product categories in our store. Find electronics, fashion, home essentials, and more from trusted collections."
      />
      <meta name="author" content="Ahmed Moahmed" />
      <meta property="og:title" content="Categories - Browse All Product Categories" />
      <meta
        property="og:description"
        content="Discover and browse all product categories in our store. Find electronics, fashion, home essentials, and more from trusted collections."
      />
    </Head>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 text-center">
          {CategoryList.map((categoryitem) => {
            return (
              <CategoryCard key={categoryitem._id} category={categoryitem} />
            );
          })}
        </div>
      </>
    </div>
  );
}
