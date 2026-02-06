import Header from "@/components/Header/header";
import styles from "./page.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
}
