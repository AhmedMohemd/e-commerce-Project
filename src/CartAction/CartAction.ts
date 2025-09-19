"use server";
import { getUserToken } from "@/getUserToken";
// get cart data
export async function getCartProductData() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      headers: {
        token: token as string,
      },
    }
  );

  const data = await respons.json();
  return data;
}
// add product to cart
export async function AddToCart(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
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
export async function removeFromCart(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
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
// remove all product from cart
export async function clearCart() {
  const token= await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
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
// number of product in cart
export async function productQuantity(id: string, count: number) {
  const token= await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: count }),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await respons.json();
  return data;
}
