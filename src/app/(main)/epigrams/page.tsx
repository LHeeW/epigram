import Link from "next/link";
import PlusIcon from "@/../public/icons/plus_icon.svg";
import EmotionList from "@/components/EmotionList/emotioin-list";
import NewestComment from "@/components/NewestComment/newest-comment";
import NewestEpigrams from "@/components/NewestEpigrams/newest-epigrams";
import TodayEpigram from "@/components/today-epigram";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.epigrams_container}>
        <div className={styles.epigram_today_container}>
          <h3 className={styles.epigram_today_title}>오늘의 에피그램</h3>
          <TodayEpigram />
        </div>

        <div className={styles.emotion_container}>
          <h3 className={styles.emotion_title}>오늘의 감정은 어떤가요?</h3>
          <EmotionList />
        </div>

        <div className={styles.new_feed_epigrams_container}>
          <h3 className={styles.new_feed_epigrams_title}>최신 에피그램</h3>
          <NewestEpigrams />
        </div>
      </div>

      <Link href={"/addepigram"} className={styles.create_epigram_btn}>
        <PlusIcon />
      </Link>
    </div>
  );
}
