"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import React, { useTransition } from "react";
import Wishlist from "./ui/Wishlist";
import formatPrice from "../utils/formatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  product: {
    id: string;
    title: string;
    discountedPrice: number;
    basePrice: number;
    thumbnail: string;
  };
}
export default function WishlistProductCard({ product }: Props) {
  const { basePrice, discountedPrice, id, thumbnail, title } = product;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateWishlist = async () => {
    if (!id) return;

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });
    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);
    router.refresh();
  };
  return (
    <div className="flex space-x-4 items-center ">
      <Image src={thumbnail} width={100} height={100} alt={title} />
      <Link className="flex-1 h-full" href={`/${title}/${id}`}>
        <h1 className=" text-lg text-blue-gray-700 font-semibold">{title}</h1>
        <p>{formatPrice(discountedPrice ? discountedPrice : basePrice)}</p>
      </Link>

      <Button
        onClick={() => {
          startTransition(async () => await updateWishlist());
        }}
        variant="text"
        disabled={isPending}
      >
        <Wishlist isActive />
      </Button>
    </div>
  );
}
