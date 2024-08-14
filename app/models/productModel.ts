import { Schema, Model, model, models } from "mongoose";
import categories from "../utils/categories";

export interface NewProduct {
  title: string;
  description: string;
  bulletPoints?: string[];
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string }[];
  price: {
    base: number;
    discounted: number;
  };
  quantity: number;
  category: string;
  rating?: number;
}

export interface ProductDocument extends NewProduct {
  sale?: number;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: { type: [String] },
    thumbnail: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    category: { type: String, enum: [...categories], required: true },
    rating: Number,
  },
  { timestamps: true }
);

productSchema.virtual("sale").get(function (this: ProductDocument) {
  const base = this.price.base;
  const discounted = this.price.discounted;
  return Math.round(((base - discounted) / base) * 100);
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
