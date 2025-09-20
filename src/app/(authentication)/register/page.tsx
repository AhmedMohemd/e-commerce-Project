"use client";
import React, { useState } from "react";
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
import { ClipLoader } from "react-spinners";
import Head from "next/head";
export default function Register() {
    const [btnloder, setBtnLoder] = useState<boolean>(true);
  
  const Route =useRouter()
  const RegisterSchema = z
    .object({
      name: z
        .string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(16, "Name must be at most 16 characters long"),
      email: z.email().nonempty("Email is required"),
      phone: z
        .string()
        .regex(/^(\+2)?01[0125][0-9]{8}$/, "phone must be valid")
        .nonempty("phone is required"),

      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and may include numbers (no spaces)."
        )
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(15, "Password must be at most 15 characters long"),
      rePassword: z.string().nonempty("RePassword is required"),
    })
    .refine(
      (object) => {
        return object.password === object.rePassword;
      },
      { path: ["rePassword"], error: "rePasswords do not match Passwords" }
    );
  const RegisterForm = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterSchema),
  });
  async function handleRegister(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    setBtnLoder(false);
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await respons.json()
      setBtnLoder(true);
    console.log(data)
    if (
      data.message === "success" ||
      data.massage === "Account Already Exists"
    ) {
      toast.success("Register success , you can login now", {
        position: "top-right",
        icon: "👏",
      });
      Route.push("/login");
    } else {
      toast.error(data.message, { icon: "❌", position: "top-right" });
    }
  }
  return (
    <>
      <Head>
        <title>Register - Create Your Account</title>
        <meta
          name="description"
          content="Register a new account by providing your name, email, phone number, and password."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta property="og:title" content="Register - Create Your Account" />
        <meta
          property="og:description"
          content="Register a new account by providing your name, email, phone number, and password."
        />
      </Head>
      <div className=" mx-auto my-10 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-2/4 shadow-2xl p-13 rounded-2xl ">
        <Form {...RegisterForm}>
          <form
            action=""
            className="space-y-4"
            onSubmit={RegisterForm.handleSubmit(handleRegister)}
          >
            <FormField
              control={RegisterForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name: </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={RegisterForm.control}
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
              control={RegisterForm.control}
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
            <FormField
              control={RegisterForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> rePassword: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={RegisterForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> phone: </FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnloder ? (
              <Button className="w-full bg-main mt-5">Register</Button>
            ) : (
              <Button className="w-full bg-main mt-5">
                <ClipLoader color="#ffffff" />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
