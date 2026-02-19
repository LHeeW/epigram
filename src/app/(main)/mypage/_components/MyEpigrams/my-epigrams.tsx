"use client";

import Epigram from "@/components/Epigram/epigram";
import { useGetEpigramListInfiniteQuery } from "@/hooks/TanstackQuery/InfiniteQuery/use-epigram-infinite";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import styles from "./my-epigrams.module.css";

const LIMIT = 3;

export default function MyEpigrams() {
  const { data: userData } = useGetUserMeQuery();

  const {
    data: epigramList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetEpigramListInfiniteQuery({
    limit: LIMIT,
    writerId: userData?.id,
  });

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 1.0,
    rootMargin: "0px",
  });

  const totalCount = epigramList?.pages[0].totalCount ?? 0;

  if (isLoading) return <div>로딩중...</div>;

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{`내 에피그램(${totalCount})`}</h3>
        {epigramList?.pages.map((page) =>
          page.list.map((epigram) => (
            <Epigram key={epigram.id} data={epigram} />
          )),
        )}
      </div>
      <div ref={targetRef}>
        {isFetchingNextPage && <span>데이터를 가져오는 중입니다.</span>}
      </div>
    </>
  );
}
