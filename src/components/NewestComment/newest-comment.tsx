"use client";

import { keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useGetCommentsQuery } from "@/hooks/TanstackQuery/Query/use-comment-query";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import CommentComponent from "../Comment/comment";
import Pagination from "../Pagination/pagination";
import styles from "./newest-comment.module.css";

const LIMIT = 3;

export default function NewestComment() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: userData } = useGetUserMeQuery();

  const { data: commenstList, isLoading } = useGetCommentsQuery(
    {
      limit: LIMIT,
      cursor: (currentPage - 1) * LIMIT, // offset 계산
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  if (isLoading) return <div>로딩중...</div>;

  if (
    !commenstList ||
    commenstList.list.length === 0 ||
    commenstList.totalCount === 0
  ) {
    return (
      <div>
        아직 작성된 댓글이 없습니다!!
        <br />
        댓글을 작성해보세요!
      </div>
    );
  }

  return (
    <>
      <div className={styles.comments_list_container}>
        {commenstList.list.map((comment) => (
          <CommentComponent
            key={comment.id}
            data={comment}
            userId={userData?.id as number}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={commenstList.totalCount}
        limit={LIMIT}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
