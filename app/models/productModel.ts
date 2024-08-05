import mongoose, { Document, Schema, Model, model, models } from "mongoose";
import categories from "../utils/categories";

interface ProductDocument extends Document {
  title: string;
  description: string;
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string };
  price: {
    base: number;
    discounted: number;
  };
  sale?: number;
  quantity: number;
  category: string;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: {
      type: Object,
      required: true,
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    images: { url: String, id: String },
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    category: { type: String, enum: [...categories], required: true },
  },
  { timestamps: true }
);

productSchema.virtual("sale").get(function (this: ProductDocument) {
  const base = this.price.base;
  const discounted = this.price.discounted;
  return ((base - discounted) / base) * 100;
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
