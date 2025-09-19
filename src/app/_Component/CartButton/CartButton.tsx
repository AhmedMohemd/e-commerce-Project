"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@/CartAction/CartAction";
import { toast } from "sonner";
import { CountContaxt } from "@/CountProvider";
export default function CartButton({ id }: { id: string }) {
  const CountData = useContext(CountContaxt);

  // add product to cart
  async function addProductToCart(id: string) {
    const data = await AddToCart(id);
    if (data.status == "success") {
      toast.success(data.message, { position: "top-right" });
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      CountData?.setCount(sum);
    } else {
      toast.error("ID is not correct", { position: "top-right" });
    }
  }

  return (
    <Button
      onClick={() => {
        addProductToCart(id);
      }}
      className="w-full bg-main mt-5 cursor-pointer"
    >
      Add To Cart
    </Button>
  );
}
