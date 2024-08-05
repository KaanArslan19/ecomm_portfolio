"use client";
import ProductForm from "@/app/components/ProductForm";
import { NewProductInfo } from "@/app/types";
import { uploadImage } from "@/app/utils/helper";
import { newProductInfoSchema } from "@/app/utils/validationSchema";
import React from "react";
import { toast } from "react-toastify";
import { ValidationError } from "yup";

export default function Create() {
  const handleCreateProduct = async (values: NewProductInfo) => {
    try {
      // await newProductInfoSchema.validate(values, { abortEarly: false });
      await uploadImage(values.thumbnail!);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner.map((err) => {
          toast.error(err.message);
        });
        console.log(errors);
      }
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
}
