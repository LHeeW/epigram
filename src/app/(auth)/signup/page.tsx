import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/../public/images/logo_lg.webp";
import InputForm from "./(input-form)/input-form";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <Image src={LogoImage} alt="Logo_Image" unoptimized />
      </Link>
      <InputForm />
    </div>
  );
}
