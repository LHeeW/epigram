"use client";

import Link from "next/link";
import UserIcon from "@/../public/icons/user_icon.svg";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import styles from "./get.user.module.css";

export default function GetUser() {
  const { data: user } = useGetUserMeQuery();

  return (
    <Link href={"/mypage"} className={styles.user_container}>
      <UserIcon className={styles.user_icon} />
      <span className={styles.nickname}>{user?.nickname || "알 수 없음"}</span>
    </Link>
  );
}
