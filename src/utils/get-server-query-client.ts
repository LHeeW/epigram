import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 서버 전용
// 서버 컴포넌트는 요청마다 독립적인 인스턴스를 가져야 함.
// prefetch를 하려고 하면 이걸 쓰면 됨
export const getQueryClient = cache(() => new QueryClient());

// 서버 컴포넌트에서 활용 예시

// export default async function PostsPage() {
//   1. 선언
//   const queryClient = getQueryClient()

//   2. 서버에서 데이터 미리 가져오기 (Prefetching)
//   await queryClient.prefetchQuery({
//     queryKey: ['posts'],
//     queryFn: fetchPosts,
//   })

//   return (
//     3. HydrationBoundary를 통해 서버에서 가져온 데이터를 클라이언트로 전달
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Posts />
//     </HydrationBoundary>
//   )
// }
