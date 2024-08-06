/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL: process.env.DB_URL,
    MAILTRAP_AUTH_PASS: process.env.MAILTRAP_AUTH_PASS,
    MAILTRAP_AUTH_USER: process.env.MAILTRAP_AUTH_USER,
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL,
    SIGN_IN_URL: process.env.SIGN_IN_URL,
    ClOUDINARY_NAME: process.env.ClOUDINARY_NAME,
    ClOUDINARY_API_KEY: process.env.ClOUDINARY_API_KEY,
    ClOUDINARY_API_SECRET: process.env.ClOUDINARY_API_SECRET,
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
