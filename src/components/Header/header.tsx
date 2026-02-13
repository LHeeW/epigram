import { cookies } from "next/headers";
import { authKeys } from "@/utils/Constants/auth";

import styles from "./header.module.css";

import LoggedOffHeader from "./LoggedOff/loggedOffHeader";
import LoggedOnHeader from "./LoggedOn/loggedOnHeader";

export default async function Header() {
  const cookieStore = await cookies();

  return (
    <header className={styles.header}>
      {cookieStore.get(authKeys.ACCESS_TOKEN) ? (
        <LoggedOnHeader />
      ) : (
        <LoggedOffHeader />
      )}
    </header>
  );
}
