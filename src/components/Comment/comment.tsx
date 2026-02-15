"use client";

import Image from "next/image";
import { useState } from "react";
import SampleImage from "@/../public/images/space1.webp";
import CommentForm from "@/app/(main)/epigrams/[id]/_components/CommentComponent/comment-form";
import {
  useDeleteCommentsMutation,
  useUpdateCommentsMutation,
} from "@/hooks/TanstackQuery/Mutation/use-comment-mutation";
import type { components } from "@/types/types";
import { getRelativeTime } from "@/utils/Constants/formatTime";
import styles from "./comment.module.css";

interface CommentProps {
  data: components["schemas"]["CommentType"];
  userId: number;
  epigramId: number;
}

export default function Comment({ data, userId, epigramId }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateMutate } = useUpdateCommentsMutation();
  const { mutate: deleteMutate } = useDeleteCommentsMutation();

  if (isEditing) {
    return (
      <CommentForm
        userImage={data.writer.image}
        initialContent={data.content}
        initialIsPrivate={data.isPrivate}
        submitLabel="수정"
        onCancel={() => setIsEditing(false)}
        onSubmit={(content, isPrivate) => {
          updateMutate(
            {
              id: data.id,
              epigramId: epigramId,
              data: { isPrivate, content },
            },
            {
              onSuccess: () => setIsEditing(false),
            },
          );
        }}
      />
    );
  }
  return (
    <>
      <hr className={styles.hr} />
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={data.writer?.image ?? SampleImage}
          alt="이미지"
          width={48}
          height={48}
        />
        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.name_container}>
              <div className={styles.name}>{data.writer.nickname}</div>
              <div className={styles.time}>
                {getRelativeTime(data.createdAt)}
              </div>
            </div>
            {userId === data.writer.id && (
              <div className={styles.btn_container}>
                <button
                  className={styles.update_btn}
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </button>
                <button
                  className={styles.delete_btn}
                  type="button"
                  onClick={() => {
                    deleteMutate(
                      { id: data.id, epigramId },
                      {
                        onSuccess: () => alert("삭제되었습니다."),
                      },
                    );
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className={styles.content}>{data.content}</div>
        </div>
      </div>
    </>
  );
}
