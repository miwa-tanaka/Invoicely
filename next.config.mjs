/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/Invoicely" : "",
  eslint: {
    dirs: ["src/components/", "src/app/"],
  },
};

export default nextConfig;
