"use server";

import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.ClOUDINARY_NAME,
  api_key: process.env.ClOUDINARY_API_KEY,
  api_secret: process.env.ClOUDINARY_API_SECRET,
  secure: true,
});

export const getCloudSignature = async () => {
  const secret = cloudinary.config().api_secret!;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    secret
  );
  return { timestamp, signature };
};
export const getCloudConfig = () => {
  return {
    name: "dsfttmq45",
    key: "193438483785419",
  };
};
