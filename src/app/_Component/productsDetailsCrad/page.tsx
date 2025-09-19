import React from "react";

import { ProductDetailsData } from "@/types/productsDetails.type";
import ProductDetailsSilder from "../ProductDetailsSilder/ProductDetailsSilder";
import CartButton from "../CartButton/CartButton";
export default function ProductsDetailsCrad({
  product,
}: {
  product: ProductDetailsData;
}) {
  const {
    title,
    _id,
    ratingsAverage,
    price,
    category: { name },
    description,
    images,
  } = product;
  return (
    <div className="shadow-2xl p-10 my-10">
      <div className="grid grid-cols-12 items-center gap-5 ">
        <div className="col-start-2 col-end-5">
          <ProductDetailsSilder images={images} />
        </div>
        <div className="col-start-6 col-end-12">
          <h1>{title}</h1>
          <p>{description}</p>
          <h5 className="text-main">{name}</h5>
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
          <CartButton id={_id} />
        </div>
      </div>
    </div>
  );
}
