import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sequelize/core"],
  transpilePackages: ["spidgorny-react-helpers"],
  output: "standalone",
};

export default nextConfig;
