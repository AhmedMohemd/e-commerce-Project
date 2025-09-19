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
export default function ResetPassword() {
  const [btnloder, setBtnLoder] = useState<boolean>(true);
  const Route = useRouter();
  const ResetPasswordSchema = z.object({
    email: z.email().nonempty("Email is required"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).+$/,
        "newPassword must contain at least one uppercase letter, one lowercase letter, one special character, and may include numbers (no spaces)."
      )
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(15, "Password must be at most 15 characters long"),
  });
  const ResetPasswordForm = useForm({
    defaultValues: {
      newPassword: "",
      email: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });
  async function handleResetPassword(
    values: z.infer<typeof ResetPasswordSchema>
  ) {
    console.log(values);
    setBtnLoder(false);
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await respons.json();
    console.log(data);
    setBtnLoder(true);
    if (data.token) {
      toast.success("Reset Password Success", {
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
        <title>Reset Password - Secure Your Account</title>
        <meta
          name="description"
          content="Reset your account password securely by entering your email and creating a new password with strong security requirements."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta
          property="og:title"
          content="Reset Password - Secure Your Account"
        />
        <meta
          property="og:description"
          content="Reset your account password securely by entering your email and creating a new password with strong security requirements."
        />
      </Head>
      <div className="w-2/4 mx-auto my-10 shadow-2xl p-13 rounded-2xl ">
        <Form {...ResetPasswordForm}>
          <form
            action=""
            className="space-y-4"
            onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
          >
            <FormField
              control={ResetPasswordForm.control}
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
              control={ResetPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> New Password: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnloder ? (
              <Button className="w-full bg-main mt-5">Reset Password</Button>
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
