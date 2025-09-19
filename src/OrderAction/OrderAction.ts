"use server";
import { getUserToken } from "@/getUserToken";
// Checkout Paymenet from cart
export async function CheckoutPaymenet(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          "content-type": "application/json",
          token: token as string,
        },
      }
    );
    const data = await respons.json()
    return data;
  }
}
export async function getAllUserOrders() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("No token found");
  }
  const respons = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/`,
    {
      headers: {
        token: token as string,
      },
    }
  );

  const data = await respons.json();
  return data;
}