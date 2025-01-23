import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sequelize/core", "spidgorny-react-helpers"],
};

export default nextConfig;
