import SearchBar from "./_components/SearchBar/search-bar";
import styles from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <SearchBar />
      {children}
    </div>
  );
}
