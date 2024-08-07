import ProductView from "@/app/components/ProductView";
import ProductModel from "@/app/models/productModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return JSON.stringify({
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
  });
};
export default async function Product({ params }: Props) {
  const { product } = params;
  const productId = product[1];
  const productDetails = JSON.parse(await fetchProduct(productId));
  let productImages = [productDetails.thumbnail];
  if (productDetails.images) {
    productImages = productImages.concat(productDetails.images);
  }
  return (
    <div className="p-4">
      <ProductView
        title={productDetails.title}
        description={productDetails.description}
        price={productDetails.price}
        sale={productDetails.sale}
        images={productImages}
        points={productDetails.bulletPoints}
      />
    </div>
  );
}
