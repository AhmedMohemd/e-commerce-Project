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
export default function ForgetPassword() {
  const [btnloder, setBtnLoder] = useState<boolean>(true);

  const Route = useRouter();
  const forgetBasswoedSchema = z.object({
    email: z.email().nonempty("Email is required"),
  });
  const forgetPasswordForm = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetBasswoedSchema),
  });
  async function handleForgetBasswoed(
    values: z.infer<typeof forgetBasswoedSchema>
  ) {
    console.log(values);
    setBtnLoder(false);
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await respons.json();
    console.log(data);
    setBtnLoder(true);
    if (data.statusMsg === "success") {
      toast.success("Reset code sent to your email", {
        position: "top-right",
        icon: "👏",
      });
      Route.push("/resetCode");
    } else {
      toast.error(data.message, { icon: "❌", position: "top-right" });
    }
  }
  return (
    <>
      <Head>
        <title>Forgot Password - Easy Account Recovery</title>
        <meta
          name="description"
          content="Password recovery page. Enter your email to receive a reset code."
        />
        <meta name="author" content="Ahmed Mohamed" />
        <meta
          property="og:title"
          content="Forgot Password - Easy Account Recovery"
        />
        <meta
          property="og:description"
          content="Password recovery page. Enter your email to receive a reset code."
        />
      </Head>

      <div className="w-2/4 mx-auto my-10 shadow-2xl p-13 rounded-2xl ">
        <Form {...forgetPasswordForm}>
          <form
            action=""
            className="space-y-4"
            onSubmit={forgetPasswordForm.handleSubmit(handleForgetBasswoed)}
          >
            <FormField
              control={forgetPasswordForm.control}
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
            {btnloder ? (
              <Button className="w-full bg-main mt-5">Send Code</Button>
            ) : (
              <Button className="w-full bg-main mt-5">
                <ClipLoader color="#ffffff" />
              </Button>
            )}{" "}
          </form>
        </Form>
      </div>
    </>
  );
}
