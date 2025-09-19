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
    const [loder] = useState<boolean>(true);
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
        {loder ? (
          <div className="text-center flex justify-center items-center min-h-screen">
            <ClipLoader color="#000" />
          </div>
        ) : (
          <div className="w-2/4 mx-auto shadow-2xl p-10 rounded-3xl">
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
                <Button
                  type="submit"
                  className="w-full bg-main mt-5 cursor-pointer"
                >
                  Pay Payment
                </Button>
                <Button
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
        )}
      </>
    </>
  );
}
