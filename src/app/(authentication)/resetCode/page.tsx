"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Head from "next/head";
export default function ResetCode() {
    const [btnloder, setBtnLoder] = useState<boolean>(true);
  const Route = useRouter();
  const forgetBasswoedSchema = z.object({
    resetCode: z.string().nonempty("Reset code is required"),
  });
  const ResetCodeForm = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(forgetBasswoedSchema),
  });
  async function handleForgetBasswoed(
    values: z.infer<typeof forgetBasswoedSchema>
  ) {
      console.log(values);
      setBtnLoder(false);
    const respons = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
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
    if (data.status === "Success") {
      toast.success("Reset code sent to your email", {
        position: "top-right",
        icon: "👏",
      });
      Route.push("/resetPassword");
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
        <Form {...ResetCodeForm}>
          <form
            action=""
            className="space-y-4"
            onSubmit={ResetCodeForm.handleSubmit(handleForgetBasswoed)}
          >
            <FormField
              control={ResetCodeForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Enter Code: </FormLabel>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            {btnloder ? (
              <Button className="w-full bg-main mt-5">verify Code</Button>
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
