import React from "react";
import {
  Card,

  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/products.type";
import Image from "next/image";

import Link from "next/link";
import CartButton from "../CartButton/CartButton";
import WishlistButton from "../wishlistButton/wishlistButton";
export default function ProductsCard({ product }: { product: Product }) {
  const {
    imageCover,
    title,
    _id,
    ratingsAverage,
    price,
    category: { name },
  } = product;
  return (
    <>
      <Card className="p-5 shadow-2xl">
        <Link href={`/products/${_id}`}>
          <CardHeader>
            <Image
              src={imageCover}
              alt={title}
              width={200}
              height={100}
              className="w-full object-cover rounded-2xl"
            />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-main">{name}</CardTitle>

            <div className="flex justify-between items-center">
              <CardTitle>{title.split("").slice(0, 2).join(" ")}</CardTitle>
            </div>
            <div className="flex justify-between items-center">
              <span>{price}EGP</span>
              <span>
                <i>
                  <i className="fa-solid fa-star rating-color">
                    {ratingsAverage}
                  </i>
                </i>
              </span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="flex justify-between items-center">
          <div className="w-3/4">
            <CartButton id={_id} />
          </div>
          <div className="w-1/4 text-center items-end">
            <WishlistButton id={_id} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
