"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  // 클라이언트 사이드에서 QueryClient를 싱글톤으로 유지하기 위해 useState를 사용
  // 페이지 전환시에 데이터가 유실되지 않고 유지됨
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
