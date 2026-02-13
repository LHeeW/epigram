import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/../public/images/logo_lg.webp";
import SignInInputForm from "./_components/signin-input-form";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Link href={"/"}>
          <Image src={LogoImage} alt="Logo_Image" unoptimized />
        </Link>
        <div className={styles.form_container}>
          <SignInInputForm />
          <div className={styles.span_container}>
            <span>회원이 아니신가요?</span>
            <Link href={"/signup"}>가입하기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
