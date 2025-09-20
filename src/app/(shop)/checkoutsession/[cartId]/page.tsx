"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutPaymenet } from "@/OrderAction/OrderAction";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
const shippingSchema = z.object({
  details: z
    .string()
    .min(5, { message: "Details must be at least 5 characters." }),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, {
    message: "Invalid Egyptian phone number.",
  }),
  city: z.string().min(2, { message: "City is required." }),
});
export default function Checkoutsession() {
  const [btnloder, setBtnLoder] = useState<boolean>(true);
  const { cartId }: { cartId: string } = useParams();
  const shippingForm = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });
  async function checkoutPaymenetSession(values: {
    details: string;
    phone: string;
    city: string;
  }) {
     setBtnLoder(false);
    console.log(values);
    const data = await CheckoutPaymenet(cartId, values);
    window.location.href = data.session.url;
  }

  return (
    <>
      <Head>
        <title>Checkout - Secure Payment</title>
        <meta
          name="description"
          content="Complete your purchase securely by entering your shipping details and proceeding with payment."
        />
        <meta name="author" content="Ahmed Moahmed" />
        <meta property="og:title" content="Checkout - Secure Payment" />
        <meta
          property="og:description"
          content="Provide your shipping details and confirm your order through our secure payment gateway."
        />
      </Head>
      <>
        <div className=" mx-auto my-10 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-2/4 shadow-2xl p-13 rounded-2xl ">
          <Form {...shippingForm}>
            <form
              action=""
              className="space-y-3"
              onSubmit={shippingForm.handleSubmit(checkoutPaymenetSession)}
            >
              <FormField
                control={shippingForm.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details :</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={shippingForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone :</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={shippingForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City :</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {btnloder ? (
                <Button
                  type="submit"
                  className="w-full bg-main mt-5 cursor-pointer"
                >
                  Pay Payment
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-main mt-5 cursor-pointer"
                >
                  <ClipLoader color="#ffffff" />
                </Button>
              )}

              <Button
                type="button"
                onClick={() => {
                  window.location.href = "/cart";
                }}
                className="w-full bg-red-600 cursor-pointer"
              >
                Cancel
              </Button>
            </form>
          </Form>
        </div>
      </>
    </>
  );
}
