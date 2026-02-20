import { Suspense } from "react";
import SearchBar from "./_components/SearchBar/search-bar";
import styles from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>로딩중...</div>}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}
