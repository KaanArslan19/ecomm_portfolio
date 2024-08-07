import FeaturedProductForm from "@/app/components/FeaturedProductForm";
import startDb from "@/app/lib/db";
import FeaturedProductModel from "@/app/models/featuredProduct";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  searchParams: { id: string };
}

const fetchFeaturedProducts = async (id: string) => {
  if (!isValidObjectId(id)) return redirect("/404");
  await startDb();
  const product = await FeaturedProductModel.findById(id);
  if (!product) return redirect("/404");
  const { _id, link, banner, title, linkTitle } = product;
  return {
    id: _id.toString(),
    link,
    banner: banner.url,
    title,
    linkTitle,
  };
};
export default async function UpdateFeaturedProducts({ searchParams }: Props) {
  const { id } = searchParams;
  const product = await fetchFeaturedProducts(id);
  return <FeaturedProductForm initialValue={product} />;
}
