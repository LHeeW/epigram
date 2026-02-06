import Image from "next/image";
import Landing1 from "@/../public/images/mobile-landing1.webp";
import Landing2 from "@/../public/images/mobile-landing2.webp";
import Landing3 from "@/../public/images/mobile-landing3.webp";
import Landing4 from "@/../public/images/mobile-landing4.webp";
import styles from "./landing-mobile.module.css";

export default function LandingMobile() {
  return (
    <div className={styles.container}>
      <Image src={Landing1} alt="설명1" unoptimized />
      <Image src={Landing2} alt="설명2" unoptimized />
      <Image src={Landing3} alt="설명3" unoptimized />
      <Image src={Landing4} alt="설명4" unoptimized />
    </div>
  );
}
