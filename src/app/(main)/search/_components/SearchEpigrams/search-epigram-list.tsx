"use client";

import { useGetEpigramListInfiniteQuery } from "@/hooks/TanstackQuery/InfiniteQuery/use-epigram-infinite";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import SearchEpigram from "./SearchEpigram/search-epigram";
import styles from "./search-epigram-list.module.css";

const LIMIT = 5;

interface SearchEpigramListProps {
  q: string;
}

export default function SearchEpigramList({ q }: SearchEpigramListProps) {
  const {
    data: EpigramList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetEpigramListInfiniteQuery({ limit: LIMIT, keyword: q });

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 1.0,
    rootMargin: "0px",
  });

  if (isLoading) return <div>로딩중입니다...</div>;

  if (EpigramList?.pages[0].totalCount === 0) return null;

  return (
    <div className={styles.container}>
      {q &&
        EpigramList?.pages.map((item) =>
          item.list.map((epigram) => (
            <SearchEpigram key={epigram.id} epigram={epigram} />
          )),
        )}
      <div ref={targetRef}>
        {isFetchingNextPage && <span>데이터를 가져오는 중입니다...</span>}
      </div>
    </div>
  );
}
