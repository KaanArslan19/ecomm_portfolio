/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MAILTRAP_AUTH_PASS: process.env.MAILTRAP_AUTH_PASS,
    MAILTRAP_AUTH_USER: process.env.MAILTRAP_AUTH_USER,
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL,
    SIGN_IN_URL: process.env.SIGN_IN_URL,
    ClOUDINARY_NAME: process.env.ClOUDINARY_NAME,
    ClOUDINARY_API_KEY: process.env.ClOUDINARY_API_KEY,
    ClOUDINARY_API_SECRET: process.env.ClOUDINARY_API_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    PAYMENT_SUCCESS_URL: process.env.PAYMENT_SUCCESS_URL,
    PAYMENT_CANCEL_URL: process.env.PAYMENT_CANCEL_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    API_SIGN_IN_ENDPOINT: process.env.API_SIGN_IN_ENDPOINT,
    MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
    MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
    VERIFICATION_URL: process.env.VERIFICATION_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
