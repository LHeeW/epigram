import Link from "next/link";
import ScrollIcon from "@/../public/icons/arrow_double_down_icon.svg";
import styles from "./top-banner.module.css";

export default function TopBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          나만 갖고 있기엔
          <br />
          아까운 글이 있지 않나요?
        </h3>
        <h5 className={styles.sub_title}>
          다른 사람들과 감정을 공유해 보세요.
        </h5>
        <Link className={styles.btn} href={"/epigrams"}>
          시작하기
        </Link>
      </div>
      <div className={styles.more_container}>
        <h5 className={styles.scroll_text}>더 알아보기</h5>
        <ScrollIcon className={styles.scroll_icon} />
      </div>
    </div>
  );
}
