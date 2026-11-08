const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const onGitHubPages =
  process.env.GITHUB_ACTIONS === "true" && repository !== "";
const basePath = onGitHubPages ? `/${repository}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
