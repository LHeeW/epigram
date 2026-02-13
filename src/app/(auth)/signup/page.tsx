import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/../public/images/logo_lg.webp";
import SignUpInputForm from "./_components/signup-input-form";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <Image src={LogoImage} alt="Logo_Image" unoptimized />
      </Link>
      <SignUpInputForm />
    </div>
  );
}
