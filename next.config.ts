import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sequelize/core"],
  transpilePackages: ["spidgorny-react-helpers"],
};

export default nextConfig;
