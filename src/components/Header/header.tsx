import styles from "./header.module.css";
import LoggedOffHeader from "./LoggedOff/loggedOffHeader";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LoggedOffHeader />
      </div>
    </header>
  );
}
