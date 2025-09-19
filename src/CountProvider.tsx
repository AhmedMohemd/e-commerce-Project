"use client";
import React, { createContext, SetStateAction, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartProductData } from "./CartAction/CartAction";
import { CartData } from "./types/CartData.type";
type ContextType = {
  count: number;
  setCount:React.Dispatch<SetStateAction<number>>;
};

export const CountContaxt = createContext<ContextType | null>(null);
export default function CouontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState<number>(0);

  async function getCartItemCount() {
    try {
      const token= await getUserToken();
      if (token) {
        const data: CartData = await getCartProductData();
        const sum = data.data.products.reduce(
          (total, item) => (total += item.count),
          0
        );
        setCount(sum);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCartItemCount();
  }, []);
  return (
    <CountContaxt.Provider value={{ count, setCount }}>
      {children}
    </CountContaxt.Provider>
  );
}
