"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="grid grid-cols-12 items-center px-5">
        <div className="col-span-8">
          <Slider {...settings} className="mx-auto my-5">
            <Image
              src="/images/slider-image-3.jpeg"
              alt="sliderImage3"
              width={1000}
              height={100}
              className="max-w-full mx-auto object-cover h-96"
            />
            <Image
              src="/images/slider-image-2.jpeg"
              alt="sliderImage2"
              width={1000}
              height={100}
              className="max-w-full mx-auto object-cover h-96"
            />
            <Image
              src="/images/slider-image-1.jpeg"
              alt="sliderImage1"
              width={1000}
              height={100}
              className="max-w-full mx-auto object-cover h-96"
            />
          </Slider>
        </div>
        <div className="col-span-4 flex flex-col h-96">
          <Image
            src="/images/slider-image-3.jpeg"
            alt="sliderImage3"
            width={1000}
            height={1000}
            className="max-w-full mx-auto object-cover h-1/2"
          />
          <Image
            src="/images/slider-image-1.jpeg"
            alt="sliderImage1"
            width={1000}
            height={1000}
            className="max-w-full mx-auto object-cover h-1/2"
          />
        </div>
      </div>
    </>
  );
}
