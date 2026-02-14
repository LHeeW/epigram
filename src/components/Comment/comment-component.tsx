import Image from "next/image";
import SampleImage from "@/../public/images/space1.webp";
import type { components } from "@/types/types";
import { getRelativeTime } from "@/utils/Constants/formatTime";
import styles from "./comment-component.module.css";

interface CommentProps {
  data: components["schemas"]["CommentType"];
}

export default function CommentComponent({ data }: CommentProps) {
  return (
    <>
      <hr className={styles.hr} />
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={`${data.writer.image || SampleImage}`}
          alt="이미지"
        />
        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.name_container}>
              <div className={styles.name}>{data.writer.nickname}</div>
              <div className={styles.time}>
                {getRelativeTime(data.createdAt)}
              </div>
            </div>
            <div className={styles.btn_container}>
              <button className={styles.update_btn} type="button">
                수정
              </button>
              <button className={styles.delete_btn} type="button">
                삭제
              </button>
            </div>
          </div>
          <div className={styles.content}>{data.content}</div>
        </div>
      </div>
    </>
  );
}
