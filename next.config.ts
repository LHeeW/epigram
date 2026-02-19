import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fe-project-epigram-api.vercel.app",
        port: "",
        pathname: "/17-1/**",
      },
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  /* config options here */

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: [
            {
              loader: "@svgr/webpack",
              options: { dimensions: false, icon: true },
            },
          ],
          as: "*.js",
        },
      },
    },
  },

  webpack(config: any) {
    // 1. 기존의 SVG 로더 규칙을 찾습니다.
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    if (fileLoaderRule) {
      config.module.rules.push(
        // 2. ?url 쿼리가 붙은 경우에만 기존 로더(이미지 경로)를 사용하게 합니다.
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        // 3. 그 외의 모든 .svg 파일은 SVGR이 컴포넌트로 변환하게 합니다.
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
          },
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                dimensions: false,
                icon: true,
                // replaceAttrValues: {
                //   "#000": "currentColor",
                //   black: "currentColor",
                // },
              },
            },
          ],
        },
      );

      // 4. 기존의 포괄적인 SVG 규칙에서는 .svg를 제외시킵니다.
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
