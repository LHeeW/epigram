"use client";

import Link from "next/link";
import LinkIcon from "@/../public/icons/external_link_icon.svg";
import KebabIcon from "@/../public/icons/kebab_menu_icon.svg";
import LikeIcon from "@/../public/icons/like_icon.svg";
import { useUpdateEpigramsLikeMutation } from "@/hooks/TanstackQuery/Mutation/use-epigram-mutation";
import { useGetEpigramIdQuery } from "@/hooks/TanstackQuery/Query/use-epigram-query";
import styles from "./epigram-component.module.css";

interface EpigramComponentProps {
  id: string;
}

export default function EpigramComponent({ id }: EpigramComponentProps) {
  const { data: epigram, isLoading } = useGetEpigramIdQuery(parseInt(id, 10));

  const { mutate } = useUpdateEpigramsLikeMutation();

  const handleLikeBtnClick = () => {
    const userAction = epigram?.isLiked ? "UNLIKE" : "LIKE";
    mutate({ id: parseInt(id, 10), userAction });
  };

  if (id !== epigram?.id.toString()) return null;
  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className={styles.epigram_container}>
      <div className={styles.epigram_content_container}>
        <div className={styles.tag_kebab_container}>
          <div className={styles.tag_container}>
            {epigram?.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            )) ?? ""}
          </div>
          <button className={styles.kebab_btn} type="button">
            <KebabIcon className={styles.kebab_icon} />
          </button>
        </div>

        <div className={styles.content}>{epigram.content}</div>
        <div className={styles.author}>- {epigram.author} -</div>
      </div>
      <div className={styles.btn_container}>
        <button
          className={styles.like_btn}
          type="button"
          onClick={handleLikeBtnClick}
        >
          <LikeIcon className={styles.like_icon} />
          {epigram.likeCount}
        </button>
        {epigram.referenceUrl && (
          <Link
            href={epigram.referenceUrl}
            className={styles.link_btn}
            target="blank"
            rel="noopener noreferrer"
          >
            {epigram.referenceTitle || "링크"}
            <LinkIcon className={styles.link_icon} />
          </Link>
        )}
      </div>
    </div>
  );
}
