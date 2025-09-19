"use client";
import { AddToWishList } from "@/wishListAction/wishListAction";
import React from "react";
import { toast } from "sonner";

export default function wishlistButton({ id }: { id: string }) {
  async function addProductToWishList(id: string) {
    const data = await AddToWishList(id);
    if (data.status == "success") {
      toast.success(data.message, { position: "top-right" });
    } else {
      toast.error("ID is not correct", { position: "top-right" });
    }
  }

  return (
    <>
      <i
        onClick={() => {
          addProductToWishList(id);
        }}
        className="fa-solid fa-heart mt-5 cursor-pointer text-red-500"
      ></i>
    </>
  );
}
