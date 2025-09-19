"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookiesData = await cookies();
  const userToken = cookiesData.get("next-auth.session-token")?.value;
  const data = await decode({
    token: userToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return data?.token;
}
