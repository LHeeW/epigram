"use client";

import Epigram from "@/components/Epigram/epigram";
import { useGetEpigramListInfiniteQuery } from "@/hooks/TanstackQuery/InfiniteQuery/use-epigram-infinite";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import FeedGrid from "./_components/feed-gird";

const LIMIT = 8;

export default function Page() {
  const {
    data: epigramsList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetEpigramListInfiniteQuery({ limit: LIMIT });

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 1.0,
    rootMargin: "0px",
  });

  if (isLoading) return <div>로딩중...</div>;

  return (
    <FeedGrid>
      {epigramsList?.pages.map((page) =>
        page.list.map((epigram) => <Epigram key={epigram.id} data={epigram} />),
      )}

      <div ref={targetRef}>
        {isFetchingNextPage && <span>데이터를 가져오는 중입니다...</span>}
      </div>
    </FeedGrid>
  );
}
