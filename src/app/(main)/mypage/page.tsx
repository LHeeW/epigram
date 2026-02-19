import Charts from "./_components/\bCharts/charts";
import MyEpigrams from "./_components/MyEpigrams/my-epigrams";
import ProfileImage from "./_components/ProfileImage/profile-image";
import TodayEmotion from "./_components/TodayEmotion/today-emotion";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <ProfileImage />
        <TodayEmotion />
        <div>달력</div>
        <Charts />
      </div>
      <MyEpigrams />
    </div>
  );
}
