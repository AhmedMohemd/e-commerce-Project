"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
export default function ProductDetailsSilder({ images }: { images: string[] }) {
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
    <div>

      <Slider {...settings} className="mx-auto my-5">
        {images.map((img) => {
          return (
            <div key={img} className="">
              <Image
                src={img}
                alt="sliderImage3"
                width={1000}
                height={100}
                className="max-w-full mx-auto object-cover h-96"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
