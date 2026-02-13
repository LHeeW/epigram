import Link from "next/link";
import styles from "./bottom-banner.module.css";

export default function BottomBanner() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        날마다
        <br />
        에피그램
      </h3>
      <Link className={styles.btn} href={"/epigrams"}>
        시작하기
      </Link>
    </div>
  );
}
