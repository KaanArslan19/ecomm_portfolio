import UpdateProduct from "@/app/components/UpdateProduct";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";
import { ProductResponse } from "@/app/types";

interface Props {
  params: {
    productId: string;
  };
}

const fetchProductInfo = async (productId: string): Promise<string> => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");
  const finalProduct: ProductResponse = {
    id: product._id.toString(),
    title: product.title,
    thumbnail: product.thumbnail,
    images: product.images?.map(({ url, id }) => ({ url, id })),
    bulletPoints: product.bulletPoints,
    description: product.description,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
  };
  return JSON.stringify(finalProduct);
};
export default async function UpdatePage(props: Props) {
  const { productId } = props.params;
  const product = await fetchProductInfo(productId);
  console.log(product);
  return <UpdateProduct product={JSON.parse(product)} />;
}
