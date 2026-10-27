import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile in a parent directory
  // doesn't make Next infer the wrong root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
