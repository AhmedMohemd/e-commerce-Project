"use client";
import CartButton from "@/app/_Component/CartButton/CartButton";
import { WishListData, WishListProduct } from "@/types/WishListData";
import {
  getWishlistProductData,
  removeFromWishList,
} from "@/wishListAction/wishListAction";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

export default function Page() {
  const [wishListItem, setWishListItem] = useState<WishListProduct[]>([]);
  const [loder, setLoder] = useState<boolean>(true);
  // get Wish list data
  async function getWishListData() {
    setLoder(true);
    const data: WishListData = await getWishlistProductData();
    setWishListItem(data.data);
    setLoder(false);
  }
  useEffect(() => {
    getWishListData();
  }, []);
  // delete product from wish list
  async function deleteProduct(id: string) {
    const data = await removeFromWishList(id);
    if (data.status === "success") {
      toast.success("Product removed from Wish List", {
        position: "top-right",
      });
      setWishListItem(data.data);
    }
  }
  return (
    <>
      <Head>
        <title>Wish List - Your Favorite Products</title>
        <meta
          name="description"
          content="View and manage your favorite products in your Wish List. Add them to your cart or remove them anytime."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta
          property="og:title"
          content="Wish List - Your Favorite Products"
        />
        <meta
          property="og:description"
          content="Check your saved products in the Wish List. Move them to your cart or manage them easily."
        />
      </Head>
      <div className="w-3/4 mx-auto shadow-2xl rounded-3xl">
        {loder ? (
          <div className="text-center flex justify-center items-center min-h-screen">
            <ClipLoader color="#000" />
          </div>
        ) : (
          <>
            {wishListItem && wishListItem.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span>Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishListItem.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={item.imageCover}
                            width={100}
                            height={100}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={item.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <div className="flex flex-col">
                            {item.title}
                            <span
                              onClick={() => {
                                deleteProduct(item.id);
                              }}
                              className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                            >
                              Remove Product{" "}
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 w-28">
                          <CartButton id={item._id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h2 className="text-center text-red-700">
                No items in your Wish List
              </h2>
            )}
          </>
        )}
      </div>
    </>
  );
}
