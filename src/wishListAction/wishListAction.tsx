"use server";
import { getUserToken } from "@/getUserToken";

// get wish list data
export async function getWishlistProductData() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      headers: {
        token: token as string,
      },
    }
  );
  const data = await respons.json();
  return data;
}
// add product to wish list 
export async function AddToWishList(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await respons.json();
  return data;
}
// remove product from cart
export async function removeFromWishList(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    }
  );

  const data = await respons.json();
  return data;
}