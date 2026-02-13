import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@/../public/icons/hamburger_menu_icon.svg";
import LogoImage from "@/../public/images/logo_lg.webp";
import { getUsersMe } from "@/apis/User/user-api";
import { userKeys } from "@/hooks/TanstackQuery/query-keys";
import { getQueryClient } from "@/utils/get-server-query-client";
import GetUser from "./get-user";
import styles from "./loggedOnHeader.module.css";

export default async function LoggedOnHeader() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: userKeys.me(),
    queryFn: getUsersMe,
    staleTime: 1000 * 60,
  });

  return (
    <div className={styles.container}>
      <div className={styles.menu_logo_container}>
        <MenuIcon className={styles.menu} />
        <Link className={styles.logo_container} href={"/"}>
          <Image
            className={styles.logo}
            src={LogoImage}
            alt="Logo_Image"
            unoptimized
          />
        </Link>
        <Link className={styles.feed} href={"/feed"}>
          피드
        </Link>
        <Link className={styles.search} href={"/search"}>
          검색
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GetUser />
      </HydrationBoundary>
    </div>
  );
}
