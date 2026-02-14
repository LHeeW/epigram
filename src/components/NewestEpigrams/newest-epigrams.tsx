"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useGetEpigramListQuery } from "@/hooks/TanstackQuery/Query/use-epigram-query";
import Epigram from "../Epigram/epigram";
import Pagination from "../Pagination/pagination";
import styles from "./newest-epigrams.module.css";

const LIMIT = 3;

export default function NewestEpigrams() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: epigramsList,
    isLoading,
    isPlaceholderData,
  } = useGetEpigramListQuery(
    {
      limit: 3,
      cursor: (currentPage - 1) * LIMIT, // offset 계산
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  if (isLoading) return <div>로딩중...</div>;

  if (
    !epigramsList ||
    epigramsList.totalCount === 0 ||
    epigramsList.list.length === 0
  ) {
    return (
      <div>
        아직 생성된 에피그램이 없습니다!!
        <br />
        에피그램을 생성해보세요!
      </div>
    );
  }

  return (
    <>
      <div className={styles.new_feed_epigrams_list_container}>
        {epigramsList.list.map((epigram) => (
          <Epigram key={epigram.id} data={epigram} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={epigramsList.totalCount}
        limit={LIMIT}
        onPageChange={(page) => !isPlaceholderData && setCurrentPage(page)}
      />
    </>
  );
}
