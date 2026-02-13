const isServer = typeof window === "undefined";

export const BASE_URL = isServer
  ? process.env.NEXT_PUBLIC_API_SERVER_URL
  : "/api";
