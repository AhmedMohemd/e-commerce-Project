import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import img1 from "../../../../public/images/Amazon_Pay.png";
import img2 from "../../../../public/images/American Express Logo.png";
import img3 from "../../../../public/images/paypal.jpg";
import img4 from "../../../../public/images/payment-card.jpg";

export default function Footer() {
  return (
    <div className="p-10 bg-gray-100">
  
      <h2 className="text-lg font-semibold">Get the FreshCart App</h2>
      <p className="text-gray-600">
        We will send you a link, open it on your phone to download the app.
      </p>

      {/* Input & Button */}
      <div className="flex flex-col md:flex-row items-center my-5 w-full gap-3">
        <Input
          type="email"
          className="w-full md:flex-1"
          placeholder="Enter your email"
        />
        <Button className="w-full md:w-1/4 bg-main cursor-pointer">
          Share App Link
        </Button>
      </div>

      <hr className="my-5" />

      <div className="my-7 w-full flex flex-col md:flex-row justify-between items-center gap-5">
        {/* Payment Partners */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <h4 className="font-semibold">Payment Partners</h4>
          <div className="flex gap-3">
            <Image
              src={img1}
              alt="Amazon Pay"
              width={100}
              height={100}
              className="h-6 w-12 object-contain"
            />
            <Image
              src={img2}
              alt="American Express"
              width={100}
              height={100}
              className="h-6 w-12 object-contain"
            />
            <Image
              src={img3}
              alt="Paypal"
              width={100}
              height={100}
              className="h-6 w-12 object-contain"
            />
            <Image
              src={img4}
              alt="Card"
              width={100}
              height={100}
              className="h-6 w-12 object-contain"
            />
          </div>
        </div>

        {/* App Store & Google Play */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center">
          <h3 className="mr-3 text-sm md:text-base">
            Get deliveries with FreshCart
          </h3>

          {/* App Store */}
          <div className="bg-black px-3 py-2 rounded-lg flex items-center gap-2 w-40 justify-center">
            <i className="fa-brands fa-apple text-2xl text-white"></i>
            <div className="flex flex-col leading-tight text-white">
              <span className="text-[10px]">Download on the</span>
              <span className="text-sm font-semibold">App Store</span>
            </div>
          </div>

          {/* Google Play */}
          <div className="bg-black px-3 py-2 rounded-lg flex items-center gap-2 w-40 justify-center">
            <i className="fa-brands fa-google-play text-xl text-white"></i>
            <div className="flex flex-col leading-tight text-white">
              <span className="text-[10px]">Get it on</span>
              <span className="text-sm font-semibold">Google Play</span>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
