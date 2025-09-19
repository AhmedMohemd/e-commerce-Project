"use client";
import {
  clearCart,
  getCartProductData,
  removeFromCart,
  productQuantity,
} from "@/CartAction/CartAction";
import { Button } from "@/components/ui/button";
import { CountContaxt } from "@/CountProvider";
import { cart, CartData } from "@/types/CartData.type";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
// =================================
export default function Cart() {
  // =================================
  const [cartItem, setCartItem] = useState<cart>();
  const [loder, setLoder] = useState<boolean>(true);
  const [countLoder, setCountLoder] = useState<boolean>(false);
  const [countItemLoder, setCountItemLoder] = useState<string>();
  const [countDisLoder, setCountDisLoder] = useState<boolean>(false);
  const CountData = useContext(CountContaxt);
  // =================================
  // get cart data
  async function getCartData() {
    setLoder(true);
    const data: CartData = await getCartProductData();
    setCartItem(data.data);
    setLoder(false);
    let sum: number = 0;
    data.data.products.forEach((item) => {
      sum += item.count;
      CountData?.setCount(sum);
    });
  }
  useEffect(() => {
    getCartData();
  }, []);
  // =================================
  // delete product from cart
  async function deleteProduct(id: string) {
    const data = await removeFromCart(id);
    if (data.status === "success") {
      toast.success("Product removed from cart", { position: "top-right" });
      setCartItem(data.data);
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      CountData?.setCount(sum);
    }
  }
  // =================================
  // delete all product from cart
  async function clearAllCart() {
    const data = await clearCart();
    if (data.status === "success") {
      toast.success("Cart cleared", { position: "top-right" });
      setCartItem(undefined);
      CountData?.setCount(0);
    }
  }
  // quantity of product in cart
  async function updateProductQuantity(id: string, count: number) {
    setCountItemLoder(id);
    setCountLoder(true);
    setCountDisLoder(true);
    const data = await productQuantity(id, count);
    if (data.status === "success") {
      toast.success("Product count updated", { position: "top-right" });
      setCartItem(data.data);
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      CountData?.setCount(sum);
    }
    setCountLoder(false);
    setCountDisLoder(false);
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - Review Your Items</title>
        <meta
          name="description"
          content="View and manage the products in your shopping cart. Update quantities, remove items, or proceed to checkout securely."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta property="og:title" content="Shopping Cart - Review Your Items" />
        <meta
          property="og:description"
          content="View and manage the products in your shopping cart. Update quantities, remove items, or proceed to checkout securely."
        />
      </Head>
      <div className="w-3/4 mx-auto shadow-2xl rounded-3xl">
        {loder ? (
          <div className="text-center flex justify-center items-center min-h-screen">
            <ClipLoader color="#000" />
          </div>
        ) : (
          <>
            {cartItem != undefined && cartItem?.totalCartPrice != 0 ? (
              <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
                  <div className=" mb-5 flex justify-between items-center">
                    <h2 className="text-main mt-5">
                      Total Price : {cartItem?.totalCartPrice}
                    </h2>
                    <Button
                      onClick={clearAllCart}
                      className="bg-main mt-5 cursor-pointer"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-16 py-3">
                          <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItem?.products.map((item) => {
                        return (
                          <tr
                            key={item._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="p-4">
                              <Image
                                src={item.product.imageCover}
                                width={100}
                                height={100}
                                className="w-16 md:w-32 max-w-full max-h-full"
                                alt={item.product.title}
                              />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {item.product.title}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <button
                                  disabled={countDisLoder}
                                  onClick={() => {
                                    updateProductQuantity(
                                      item.product._id,
                                      (item.count -= 1)
                                    );
                                  }}
                                  className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                  type="button"
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  {item.count == 1 ? (
                                    <i className="fa-solid fa-trash"></i>
                                  ) : (
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <div className="ms-3">
                                  {countLoder &&
                                  countItemLoder == item.product._id ? (
                                    // <ClipLoader color="#ffffff" />
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                  ) : (
                                    <span>{item.count}</span>
                                  )}
                                </div>
                                <button
                                  disabled={countDisLoder}
                                  onClick={() => {
                                    updateProductQuantity(
                                      item.product._id,
                                      (item.count += 1)
                                    );
                                  }}
                                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                  type="button"
                                >
                                  <span className="sr-only">
                                    Quantity button
                                  </span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {item.price}
                            </td>
                            <td className="px-6 py-4">
                              <Button
                                disabled={countDisLoder}
                                onClick={() => {
                                  deleteProduct(item.product._id);
                                }}
                                className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 mb-3 ">
                  <Button className="w-full bg-main mt-5 cursor-pointer">
                    <Link
                      className="text-white"
                      href={"/checkoutsession/" + cartItem._id}
                    >
                      check Pay Menet
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <h2 className="text-center text-red-700">
                No items in your cart
              </h2>
            )}
          </>
        )}
      </div>
    </>
  );
}
