import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Brandes } from "@/types/BrandesData";
export default function BrandsCard({ brands }: { brands: Brandes }) {
  const { image, name } = brands;
  return (
    <>
      <Card className="  p-5 
    shadow-2xl 
    rounded-2xl 
    transition-all 
    duration-300 
    hover:scale-105 
    cursor-pointer">
        <CardHeader>
          <Image
            src={image}
            alt={name}
            width={200}
            height={100}
            className="w-full object-cover rounded-2xl h-52"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-main">
            <h1>{name}</h1>
          </CardTitle>
        </CardContent>
      </Card>
    </>
  );
}
