import * as yup from "yup";
import categories from "./categories";

const FILE_SIZE_LIMIT = 1024 * 1024; // 1MB in bytes

const fileSizeValidator = yup
  .mixed()
  .test("fileSize", "File size must be less than 1MB", (value: unknown) => {
    if (value instanceof File) {
      return value.size <= FILE_SIZE_LIMIT;
    }
    return true;
  });

// Validation schema for NewProductInfo
export const newProductInfoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  bulletPoints: yup.array().of(yup.string()),
  mrp: yup
    .number()
    .required("MRP is required")
    .positive("MRP must be a positive number"),
  salePrice: yup
    .number()
    .required("Sale Price is required")
    .positive("Sale Price must be a positive number")
    .test(
      "is-less-than-mrp",
      "Sale Price must be less than MRP",
      function (value) {
        return value < this.parent.mrp;
      }
    ),
  category: yup
    .string()
    .oneOf(categories, "Invalid category")
    .required("Category is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
  thumbnail: fileSizeValidator.required("Thumbnail is required"),
  images: yup.array().of(fileSizeValidator),
});
