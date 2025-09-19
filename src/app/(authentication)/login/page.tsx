"use client";
import React, { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { signIn } from "next-auth/react";
import { getUserToken } from "@/getUserToken";
import { getCartProductData } from "@/CartAction/CartAction";
import { CountContaxt } from "@/CountProvider";
import { CartData } from "@/types/CartData.type";
import Head from "next/head";
export default function Login() {
  const [btnloder, setBtnLoder] = useState<boolean>(true);
  const CountData = useContext(CountContaxt);
  const Route = useRouter();
  const loginSchema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and may include numbers (no spaces)."
      )
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(15, "Password must be at most 15 characters long"),
  });
  const loginForm = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin(values: z.infer<typeof loginSchema>) {
    setBtnLoder(false);
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
     setBtnLoder(true);
    if (data?.ok) { 
        toast.success("success login", {
        position: "top-right",
        icon: "👏",
        });
         const token = await getUserToken();
         if (token) {
           const data: CartData = await getCartProductData();
           const sum = data.data.products.reduce(
             (total, item) => (total += item.count),
             0
           );
           CountData?.setCount(sum);
         }
      Route.push("/");
    } else {
      toast.error(data?.error, { icon: "❌", position: "top-right" });
    }
  }
  return (
    <>
      <Head>
        <title>Login - Access Your Account</title>
        <meta
          name="description"
          content="Login to your account to access all features and manage your profile."
        />
        <meta name="author" content="Designer Name" />
        {/* Open Graph */}
        <meta property="og:title" content="Login - Access Your Account" />
        <meta
          property="og:description"
          content="Login to your account to access all features and manage your profile."
        />
      </Head>
      <div className="w-2/4 mx-auto my-10 shadow-2xl p-13 rounded-2xl ">
        <Form {...loginForm}>
          <form
            action=""
            className="space-y-4"
            onSubmit={loginForm.handleSubmit(handleLogin)}
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> email: </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgetPassword"
              className="text-sm text-blue-600! hover:underline!"
            >
              Forget Password?
            </Link>
            {btnloder ? (
              <Button className="w-full bg-main mt-5">login</Button>
            ) : (
              <Button className="w-full bg-main mt-5 text-white">
                <ClipLoader color="#ffffff" />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
