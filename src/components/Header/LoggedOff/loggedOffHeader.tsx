import Image from "next/image";
import Link from "next/link";

import PersonIcon from "@/../public/icons/person_icon.svg";
import SearchIcon from "@/../public/icons/search_icon.svg";
import LogoIcon from "@/../public/images/logo_lg.webp";

import styles from "./loggedOffHeader.module.css";

export default function LoggedOffHeader() {
  return (
    <div className={styles.container}>
      <Link className={styles.search_container} href={"/search"}>
        <SearchIcon className={styles.search_icon} />
      </Link>
      <Link className={styles.logo_container} href={"/"}>
        <Image
          className={styles.logo_icon}
          src={LogoIcon}
          alt="Logo"
          unoptimized
        />
      </Link>
      <Link className={styles.person_container} href={"/login"}>
        <PersonIcon className={styles.person_icon} />
      </Link>
    </div>
  );
}
