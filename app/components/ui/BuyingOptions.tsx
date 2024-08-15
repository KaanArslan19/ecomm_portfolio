"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "./CartCountUpdater";
import { useParams } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Wishlist from "./Wishlist";

interface Props {
  wishlist?: boolean;
}
export default function BuyingOptions({ wishlist }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { product } = useParams();
  const router = useRouter();
  const productId = product[1];
  const { loggedIn } = useAuth();
  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const addToCart = async () => {
    if (!productId) return;
    if (!loggedIn) router.push("/auth/signin");

    const res = await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);
    router.refresh();
  };
  const updateWishlist = async () => {
    if (!productId) return;
    if (!loggedIn) router.push("/auth/signin");

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);
    router.refresh();
  };
  return (
    <div className="flex items-center space-x-2">
      <CartCountUpdater
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        value={quantity}
      />

      <Button
        onClick={() => {
          startTransition(async () => await addToCart());
        }}
        variant="text"
        disabled={isPending}
      >
        Add to Cart
      </Button>
      <Button color="amber" className="rounded-full" disabled={isPending}>
        Buy Now
      </Button>

      <Button
        onClick={() => {
          startTransition(async () => await updateWishlist());
        }}
        variant="text"
        disabled={isPending}
      >
        <Wishlist isActive={wishlist} />
      </Button>
    </div>
  );
}
