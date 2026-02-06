import Image from "next/image";
import Landing1 from "@/../public/images/desktop-landing1.webp";
import Landing2 from "@/../public/images/desktop-landing2.webp";
import Landing3 from "@/../public/images/desktop-landing3.webp";
import Landing4 from "@/../public/images/desktop-landing4.webp";
import styles from "./landing-desktop.module.css";

export default function LandingDeskTop() {
  return (
    <div className={styles.container}>
      <Image src={Landing1} alt="설명1" unoptimized />
      <Image src={Landing2} alt="설명2" unoptimized />
      <Image src={Landing3} alt="설명3" unoptimized />
      <Image src={Landing4} alt="설명4" unoptimized />
    </div>
  );
}
