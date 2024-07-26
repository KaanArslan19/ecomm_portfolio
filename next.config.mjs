/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL: process.env.DB_URL,
    MAILTRAP_AUTH_PASS: process.env.MAILTRAP_AUTH_PASS,
    MAILTRAP_AUTH_USER: process.env.MAILTRAP_AUTH_USER,
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
