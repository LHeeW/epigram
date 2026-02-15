"use client";

import Comment from "@/components/Comment/comment";
import { useGetEpigramCommentsInfiniteQuery } from "@/hooks/TanstackQuery/InfiniteQuery/use-epigram-infinite";
import { usePostCommentsMutation } from "@/hooks/TanstackQuery/Mutation/use-comment-mutation";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import styles from "./comment-component.module.css";
import CommentForm from "./comment-form";

const LIMIT = 5;

interface CommentComponentProps {
  id: string;
}

export default function CommentComponent({ id }: CommentComponentProps) {
  const {
    data: commentsList,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetEpigramCommentsInfiniteQuery(parseInt(id, 10), { limit: LIMIT });

  const { data: user } = useGetUserMeQuery();

  const { mutate } = usePostCommentsMutation();

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 1.0,
    rootMargin: "0px",
  });

  const totalCommentCount = commentsList?.pages[0].totalCount;

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_wrap}>
        <h3 className={styles.comment_title}>
          댓글 ({totalCommentCount === 0 ? 0 : totalCommentCount})
        </h3>
        <CommentForm
          userImage={user?.image}
          onSubmit={(content, isPrivate) => {
            mutate({ epigramId: parseInt(id, 10), content, isPrivate });
          }}
        />
      </div>
      <div className={styles.comments_list_container}>
        {user &&
          commentsList?.pages.map((comments) =>
            comments.list.map((comment) => (
              <Comment
                key={comment.id}
                data={comment}
                userId={user.id}
                epigramId={parseInt(id, 10)}
              />
            )),
          )}
      </div>
      <div ref={targetRef}>{isFetchingNextPage && <div>로딩중...</div>}</div>
    </div>
  );
}
