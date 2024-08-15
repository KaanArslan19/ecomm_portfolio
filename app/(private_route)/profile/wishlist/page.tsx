import WishlistProductCard from "@/app/components/WishlistProductCard";
import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/404");
  const wishlist = await WishlistModel.findOne<{
    products: [
      {
        _id: ObjectId;
        title: string;
        thumbnail: { url: string };
        price: { discounted: number; base: number };
      }
    ];
  }>({
    user: session.user.id,
  }).populate({
    path: "products",
    select: "title thumbnail.url price.discounted price.base",
  });
  if (!wishlist) return [];
  return wishlist.products.map(({ _id, thumbnail, price, title }) => {
    return {
      id: _id.toString(),
      title,
      discountedPrice: price.discounted,
      basePrice: price.base,
      thumbnail: thumbnail.url,
    };
  });
};

export default async function Wishlist() {
  const products = await fetchProducts();
  if (!products.length)
    return (
      <h1 className="text-2xl font-semibold text-center opacity-50 p-6">
        There is no product in your wishlist..
      </h1>
    );

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">Your Wishlist</h1>
      {products.map((product) => {
        return <WishlistProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}
