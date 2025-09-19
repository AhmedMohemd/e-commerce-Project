"use client";
import { getAllUserOrders } from "@/OrderAction/OrderAction";
import { orders, OrdersListData } from "@/types/OrdersListData";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";

export default function Page() {
  const [ordersItem, setOrdersItem] = useState<orders[]>([]);
  const [loder, setLoder] = useState<boolean>(true);

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
    setLoder(true);
    const data: OrdersListData = await getAllUserOrders();
    setOrdersItem(data.data);
    setLoder(false);
  }

  return (
    <>
      <Head>
        <title>My Orders - Track Your Purchases</title>
        <meta
          name="description"
          content="View and track all your orders, including payment status, delivery details, and product information."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta property="og:title" content="My Orders - Track Your Purchases" />
        <meta
          property="og:description"
          content="View and track all your orders, including payment status, delivery details, and product information."
        />
      </Head>
      <div className="w-3/4 mx-auto shadow-2xl rounded-3xl">
        {loder ? (
          <div className="text-center flex justify-center items-center min-h-screen">
            <ClipLoader color="#000" />
          </div>
        ) : (
          <>
            {ordersItem && ordersItem.length > 0 ? (
              ordersItem.map((order) => (
                <div
                  key={order._id}
                  className="relative overflow-x-auto shadow-md sm:rounded-lg p-10 mb-10"
                >
                  {/*user ditails*/}
                  <div className="mb-5">
                    <h2 className="text-main font-bold">
                      Total Order Price : {order.totalOrderPrice} EGP
                    </h2>
                    <h3>
                      Payment:
                      <span className="text-main">
                        {order.paymentMethodType}
                      </span>
                    </h3>
                    <h3>
                      Paid :
                      {order.isPaid ? (
                        <span className="text-green-600"> Yes </span>
                      ) : (
                        <span className="text-red-600"> No </span>
                      )}
                    </h3>
                    <h3>
                      Delivered:{" "}
                      {order.isDelivered ? (
                        <span className="text-green-600"> Yes </span>
                      ) : (
                        <span className="text-red-600"> No </span>
                      )}
                    </h3>
                    <div className="mt-3">
                      <h4 className="font-semibold">Address:</h4>
                      <h3>
                        {" "}
                        details :{" "}
                        <span className="text-main">
                          {order.shippingAddress?.details}
                        </span>
                      </h3>
                      <h3>
                        {" "}
                        city :{" "}
                        <span className="text-main">
                          {order.shippingAddress?.city}
                        </span>
                      </h3>
                      <h3>
                        {" "}
                        phone :{" "}
                        <span className="text-main">
                          {order.shippingAddress?.phone}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Products Table */}
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Image
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
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((cartItem) => (
                        <tr
                          key={cartItem._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="p-4">
                            <Image
                              src={cartItem.product.imageCover}
                              width={80}
                              height={80}
                              alt={cartItem.product.title}
                              className="rounded-lg"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {cartItem.product.title}
                          </td>
                          <td className="px-6 py-4">{cartItem.count}</td>
                          <td className="px-6 py-4">{cartItem.price} EGP</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <h2 className="text-center text-red-700">No orders found</h2>
            )}
          </>
        )}
      </div>
    </>
  );
}
